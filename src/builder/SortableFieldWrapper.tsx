import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { ReactNode, MouseEvent as ReactMouseEvent } from 'react';
import { FieldResizeHandle } from './FieldResizeHandle';
import { CopyIcon, GripIcon, StarIcon, TrashIcon } from './registry/icons';

export interface SortableFieldWrapperProps {
    id: string;
    selected: boolean;
    typeLabel: string;
    required: boolean;
    startColSpan: number;
    resizable?: boolean;
    /** true kalau tile ini sedang jadi target drop (drag berlangsung). */
    highlightDrop?: boolean;
    /** Sembunyikan tombol "wajib diisi" (Star) — dipakai di luar konteks field form. */
    hideRequired?: boolean;
    /** Tombol toolbar tambahan, di-render sebelum tombol hapus (pakai onClick stopPropagation sendiri). */
    extraToolbar?: ReactNode;
    onSelect: () => void;
    onDuplicate: () => void;
    onToggleRequired: () => void;
    onDelete: () => void;
    onResize?: (colSpan: number) => void;
    children: ReactNode;
}

/**
 * Bungkus satu field di Canvas: bisa di-drag untuk reorder (lewati tombol grip
 * di toolbar), diklik untuk memilih, dan menampilkan type-badge + toolbar aksi
 * saat hover/terpilih — mengikuti referensi prototype. Dipakai untuk dua level:
 * top-level maupun children di dalam container (nested drag).
 */
export function SortableFieldWrapper({
    id,
    selected,
    typeLabel,
    required,
    startColSpan,
    resizable,
    highlightDrop,
    hideRequired,
    extraToolbar,
    onSelect,
    onDuplicate,
    onToggleRequired,
    onDelete,
    onResize,
    children,
}: SortableFieldWrapperProps) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
    };

    function stop(event: ReactMouseEvent) {
        event.stopPropagation();
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            data-field-tile
            role="button"
            tabIndex={0}
            onClick={(event) => {
                event.stopPropagation();
                onSelect();
            }}
            className={`group relative rounded-lg border-[1.5px] bg-white transition-[border-color,box-shadow,background-color] cursor-pointer ${
                highlightDrop
                    ? 'border-blue-400 bg-blue-50/60 ring-2 ring-blue-400/50'
                    : selected
                      ? 'border-blue-400 shadow-[0_0_0_3px_rgba(96,112,238,0.16)]'
                      : 'border-transparent hover:bg-gray-50'
            }`}
        >
            <span
                className={`pointer-events-none absolute -top-8 left-0 z-[19] rounded-full border-[1.5px] border-blue-500 bg-white px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-blue-600 uppercase shadow-sm ${
                    selected ? 'opacity-100' : 'opacity-0 transition-opacity group-hover:opacity-100'
                }`}
            >
                {typeLabel}
            </span>

            <div
                className={`absolute -top-8 right-0 z-20 flex items-center gap-0.5 rounded-lg bg-gray-900 p-1 shadow-md ${
                    selected ? 'opacity-100' : 'opacity-0 transition-opacity group-hover:opacity-100'
                }`}
            >
                <button
                    type="button"
                    {...attributes}
                    {...listeners}
                    className="flex h-6 w-6 cursor-grab items-center justify-center rounded-md text-white/80 transition-colors hover:bg-white/15 hover:text-white active:cursor-grabbing"
                    aria-label="Ubah urutan field"
                >
                    <GripIcon className="h-3.5 w-3.5" />
                </button>
                <button
                    type="button"
                    onClick={(event) => {
                        stop(event);
                        onDuplicate();
                    }}
                    className="flex h-6 w-6 items-center justify-center rounded-md text-white/80 transition-colors hover:bg-white/15 hover:text-white"
                    aria-label="Duplikat field"
                >
                    <CopyIcon className="h-3.5 w-3.5" />
                </button>
                {!hideRequired && (
                    <button
                        type="button"
                        onClick={(event) => {
                            stop(event);
                            onToggleRequired();
                        }}
                        className={`flex h-6 w-6 items-center justify-center rounded-md transition-colors ${
                            required ? 'text-amber-400' : 'text-white/80 hover:bg-white/15 hover:text-white'
                        }`}
                        aria-label="Tandai wajib diisi"
                    >
                        <StarIcon className="h-3.5 w-3.5" fill={required ? 'currentColor' : 'none'} />
                    </button>
                )}
                {extraToolbar}
                <span className="mx-0.5 h-4 w-px bg-white/20" />
                <button
                    type="button"
                    onClick={(event) => {
                        stop(event);
                        onDelete();
                    }}
                    className="flex h-6 w-6 items-center justify-center rounded-md text-white/80 transition-colors hover:bg-red-500 hover:text-white"
                    aria-label="Hapus field"
                >
                    <TrashIcon className="h-3.5 w-3.5" />
                </button>
            </div>

            {resizable && selected && (
                <FieldResizeHandle startColSpan={startColSpan} onResize={(span) => onResize?.(span)} />
            )}

            <div className="h-full overflow-hidden rounded-[7px] p-2">{children}</div>
        </div>
    );
}