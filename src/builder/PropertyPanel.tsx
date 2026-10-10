import { useState } from 'react';
import type { ColSpan, FieldConfig } from '../core';
import { GRID_COLUMNS } from '../core';
import { useBuilderFieldRegistry } from './BuilderFieldRegistryContext';
import {
    FieldGroup,
    Toggle,
    WidthPicker,
    SectionToggle,
    editorInputClass,
    editorSelectClass,
    editorTextareaClass,
} from './ui';
import { ChevronRightIcon, GearIcon, TrashIcon } from './registry/icons';

export interface PropertyPanelProps {
    selectedField: FieldConfig | null;
    onChange: (updated: FieldConfig) => void;
    onRemove: (name: string) => void;
    /** Aktifkan kemampuan tampil/sembunyi (chevrone di header + tab buka di kanan). */
    collapsible?: boolean;
    /** true = saat ini ke-sembunyikan (hanya tab vertikal tipis). */
    collapsed?: boolean;
    onToggleCollapsed?: () => void;
}

const NO_DESCRIPTION_TYPES = new Set(['heading', 'divider', 'container']);

// Preset lebar umum dalam grid 12 kolom: 25/33/50/67/75/100%.
const WIDTH_PRESETS: readonly ColSpan[] = [3, 4, 6, 8, 9, 12];

export function PropertyPanel({
    selectedField,
    onChange,
    onRemove,
    collapsible,
    collapsed,
    onToggleCollapsed,
}: PropertyPanelProps) {
    const registry = useBuilderFieldRegistry();
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({ editor: true });

    function toggleSection(key: string) {
        setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
    }

    // Ke-sembunyikan → cukup tab vertikal tipis untuk buka kembali.
    if (collapsed) {
        return (
            <div className="flex w-9 shrink-0 flex-col border-l border-gray-200 bg-white">
                <button
                    type="button"
                    onClick={onToggleCollapsed}
                    title="Buka properti field"
                    aria-label="Buka properti field"
                    className="flex w-full flex-1 flex-col items-center justify-center gap-1.5 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600"
                >
                    <GearIcon className="h-4 w-4" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider [writing-mode:vertical-rl]">
                        Properti
                    </span>
                </button>
            </div>
        );
    }

    if (!selectedField) {
        return (
            <div className="flex w-[300px] shrink-0 flex-col border-l border-gray-200 bg-white transition-[width] duration-200">
                {collapsible && (
                    <div className="flex justify-end pt-3 pr-3">
                        <button
                            type="button"
                            onClick={onToggleCollapsed}
                            title="Sembunyikan properti"
                            aria-label="Sembunyikan properti"
                            className="flex h-7 w-7 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                        >
                            <ChevronRightIcon className="h-4 w-4" />
                        </button>
                    </div>
                )}
                <div className="flex flex-1 flex-col items-center justify-center p-8 text-center text-gray-400">
                    <GearIcon className="mb-2.5 h-6 w-6 opacity-50" />
                    <p className="text-xs leading-relaxed">
                        Pilih field di canvas untuk mengatur label, validasi, dan opsinya di sini.
                    </p>
                </div>
            </div>
        );
    }

    const definition = registry[selectedField.type];
    const FieldIcon = definition?.paletteIcon;

    return (
        <div className="flex w-[300px] shrink-0 flex-col border-l border-gray-200 bg-white transition-[width] duration-200">
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3.5">
                <div className="flex min-w-0 items-center gap-2.5">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                        {FieldIcon && <FieldIcon className="h-4 w-4" />}
                    </span>
                    <div className="min-w-0">
                        <strong className="block truncate text-[13px] leading-tight text-gray-800">
                            {definition?.paletteLabel ?? selectedField.type}
                        </strong>
                        <span className="block text-[11px] leading-tight text-gray-400">
                            type: {selectedField.type}
                        </span>
                    </div>
                </div>
                {collapsible && (
                    <button
                        type="button"
                        onClick={onToggleCollapsed}
                        title="Sembunyikan properti"
                        aria-label="Sembunyikan properti"
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                    >
                        <ChevronRightIcon className="h-4 w-4" />
                    </button>
                )}
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-8 pt-4">
                {selectedField.type !== 'divider' && (
                    <FieldGroup
                        label={selectedField.type === 'heading' ? 'Teks' : 'Label'}
                        className="mb-3.5"
                    >
                        <input
                            className={editorInputClass}
                            value={selectedField.label ?? ''}
                            placeholder={selectedField.type === 'heading' ? 'Judul Bagian' : 'Nama field'}
                            onChange={(e) => onChange({ ...selectedField, label: e.target.value })}
                        />
                    </FieldGroup>
                )}

                {!NO_DESCRIPTION_TYPES.has(selectedField.type) && (
                    <FieldGroup label="Deskripsi" className="mb-3.5">
                        <textarea
                            className={editorTextareaClass}
                            value={selectedField.description ?? ''}
                            placeholder="Teks bantuan opsional di bawah label"
                            onChange={(e) => onChange({ ...selectedField, description: e.target.value })}
                        />
                    </FieldGroup>
                )}

                {selectedField.type !== 'container' && (
                    <div className="mb-3.5 flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-600">Wajib diisi</span>
                        <Toggle
                            checked={!!selectedField.required}
                            onChange={(checked) => onChange({ ...selectedField, required: checked })}
                            ariaLabel="Wajib diisi"
                        />
                    </div>
                )}

                {selectedField.type !== 'container' && (
                    <FieldGroup
                        label="Lebar"
                        className="mb-2"
                        hint="Preset dalam grid 12 kolom. Geser tepi kanan field di canvas untuk lebar kustom (drag-resize)."
                    >
                        <WidthPicker
                            options={WIDTH_PRESETS}
                            value={selectedField.layout?.colSpan ?? GRID_COLUMNS}
                            formatLabel={(v) => `${Math.round((v / GRID_COLUMNS) * 100)}%`}
                            onChange={(span) =>
                                onChange({
                                    ...selectedField,
                                    layout: { ...selectedField.layout, colSpan: span as ColSpan },
                                })
                            }
                        />
                    </FieldGroup>
                )}

                {definition?.PropertyEditor && (
                    <SectionToggle
                        title={`Pengaturan ${definition.paletteLabel ?? selectedField.type}`}
                        open={!!openSections.editor}
                        onToggle={() => toggleSection('editor')}
                    >
                        <definition.PropertyEditor field={selectedField} onChange={onChange} />
                    </SectionToggle>
                )}

                <SectionToggle
                    title="Lanjutan"
                    open={!!openSections.advanced}
                    onToggle={() => toggleSection('advanced')}
                >
                    <FieldGroup
                        label="Field name (key data)"
                        hint="Identitas field — dipakai sebagai key saat form dikirim."
                    >
                        <input className={editorSelectClass} value={selectedField.name} readOnly />
                    </FieldGroup>
                </SectionToggle>
            </div>

            <div className="border-t border-gray-200 px-4 py-3">
                <button
                    type="button"
                    onClick={() => onRemove(selectedField.name)}
                    className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 py-2 text-[13px] font-medium text-red-600 transition-colors hover:bg-red-50"
                >
                    <TrashIcon className="h-3.5 w-3.5" />
                    Hapus Field
                </button>
            </div>
        </div>
    );
}