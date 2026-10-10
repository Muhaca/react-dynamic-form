import { useRef, useState, type PointerEvent as ReactPointerEvent, type MouseEvent as ReactMouseEvent } from 'react';
import { GRID_COLUMNS } from '../core';

export interface FieldResizeHandleProps {
    startColSpan: number;
    onResize: (colSpan: number) => void;
}

interface TileRect {
    left: number;
    top: number;
    bottom: number;
    width: number;
}

/**
 * Drag-handle di tepi kanan tile field yang terpilih. Ubah lebar horizontal
 * → layout.colSpan (1–GRID_COLUMNS) relatif terhadap lebar grid 12 kolom.
 *
 * Selama drag hanya menampilkan overlay preview (garis target + chip + fill
 * samar, diposisikan lewat `position:fixed` terhadap rect tile) lalu commit
 * via onResize saat pointer dilepas. Layout TIDAK di-update di tengah drag
 * supaya elemen handle tidak ikut re-render/unmount (pointer capture akan
 * hilang kalau DOM node-nya berubah di tengah drag).
 *
 * NOTE lebar overlay: lebar tile grid TIDAK linear terhadap colSpan karena ada
 * gap antar kolom — w(s) = s·cell + (s-1)·gap. Preview memakai koreksi affine
 * (ukur cell & gap dari tile + computed `column-gap` grid di pointerdown),
 * jadi garis target akurat untuk shrink maupun expand.
 */
export function FieldResizeHandle({ startColSpan, onResize }: FieldResizeHandleProps) {
    const [preview, setPreview] = useState<number | null>(null);
    const [rect, setRect] = useState<TileRect | null>(null);
    const startXRef = useRef(0);
    const startSpanRef = useRef(startColSpan);
    const cellWidthRef = useRef(1);
    const gapPxRef = useRef(0);

    function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
        event.preventDefault();
        event.stopPropagation();
        const tile = event.currentTarget.closest('[data-field-tile]') as HTMLElement | null;
        startXRef.current = event.clientX;
        startSpanRef.current = startColSpan;
        const bounds = tile?.getBoundingClientRect();
        const tileWidth = bounds?.width ?? 0;
        const grid = tile?.closest('[data-df-grid]') as HTMLElement | null;
        const gapPx = grid ? parseFloat(getComputedStyle(grid).columnGap) : 0;
        gapPxRef.current = Number.isFinite(gapPx) ? gapPx : 0;
        const span = Math.max(1, startColSpan);
        const usableWidth = Math.max(0, tileWidth - gapPxRef.current * (span - 1));
        cellWidthRef.current = span && usableWidth > 0 ? usableWidth / span : 1;
        if (bounds) {
            setRect({ left: bounds.left, top: bounds.top, bottom: bounds.bottom, width: bounds.width });
        }
        setPreview(startColSpan);
        event.currentTarget.setPointerCapture(event.pointerId);
    }

    function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
        if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
        const delta = Math.round((event.clientX - startXRef.current) / cellWidthRef.current);
        const next = Math.min(GRID_COLUMNS, Math.max(1, startSpanRef.current + delta));
        setPreview(next);
    }

    function finish(event: ReactPointerEvent<HTMLDivElement>) {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }
        if (preview !== null) {
            onResize(preview);
        }
        setPreview(null);
        setRect(null);
    }

    function handleClick(event: ReactMouseEvent<HTMLDivElement>) {
        event.stopPropagation();
    }

    const startSpan = startSpanRef.current || startColSpan;
    const gap = gapPxRef.current;
    const previewPct =
        preview !== null && rect ? rect.width * (preview / startSpan) + gap * ((startSpan - preview) / startSpan) : null;
    const guideX = rect && previewPct !== null ? rect.left + previewPct : null;

    return (
        <div
            role="separator"
            aria-label="Ubah lebar field"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={finish}
            onPointerCancel={finish}
            onClick={handleClick}
            className="absolute top-2 bottom-2 right-[-7px] z-[5] flex w-4 cursor-ew-resize items-center justify-center"
        >
            <span className="h-7 w-1 rounded-full bg-blue-500 opacity-90 shadow-sm" />
            {rect && preview !== null && previewPct !== null && guideX !== null && (
                <>
                    <div
                        className="pointer-events-none fixed z-[30] bg-blue-500/5"
                        style={{ left: rect.left, top: rect.top, bottom: window.innerHeight - rect.bottom, width: previewPct }}
                    />
                    <div
                        className="pointer-events-none fixed top-0 bottom-0 z-[30] w-[2px] bg-blue-500"
                        style={{ left: guideX }}
                    />
                    <div
                        className="pointer-events-none fixed z-[30] -translate-x-1/2 rounded-md bg-gray-900 px-2 py-0.5 text-[10px] font-semibold text-white shadow-md"
                        style={{ left: guideX, top: rect.bottom - 28 }}
                    >
                        {Math.round((preview / GRID_COLUMNS) * 100)}%
                    </div>
                </>
            )}
        </div>
    );
}