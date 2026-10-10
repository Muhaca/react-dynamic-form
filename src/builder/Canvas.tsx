import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { DndContext, PointerSensor, useSensor, useSensors, type DragEndEvent, type DragOverEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import type { ColSpan, FieldConfig } from '../core';
import { GRID_COLUMNS } from '../core';
import { FieldList } from '../react';
import { SortableFieldWrapper } from './SortableFieldWrapper';
import { useBuilderFieldRegistry } from './BuilderFieldRegistryContext';
import { findFieldByName, locateField, type MoveFieldTarget } from './fieldTree';
import { PlusIcon } from './registry/icons';

export interface CanvasProps {
    fields: FieldConfig[];
    selectedFieldName: string | null;
    onSelectField: (name: string) => void;
    onReorder: (fromIndex: number, toIndex: number) => void;
    onDuplicate?: (name: string) => void;
    onToggleRequired?: (field: FieldConfig) => void;
    onDelete?: (name: string) => void;
    onUpdateField?: (updated: FieldConfig) => void;
    /** Pindahkan field antar level container (masuk/keluar/lintas container). */
    onMoveField?: (name: string, target: MoveFieldTarget) => void;
}

export function Canvas({
    fields,
    selectedFieldName,
    onSelectField,
    onReorder,
    onDuplicate,
    onToggleRequired,
    onDelete,
    onUpdateField,
    onMoveField,
}: CanvasProps) {
    const { control, watch } = useForm();
    const watchedValues = watch();
    const registry = useBuilderFieldRegistry();
    const [dragOverContainer, setDragOverContainer] = useState<string | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 4 } })
    );

    function handleDragOver(event: DragOverEvent) {
        const { over } = event;
        if (!over) {
            setDragOverContainer(null);
            return;
        }
        const overField = findFieldByName(fields, String(over.id));
        if (!overField) {
            setDragOverContainer(null);
            return;
        }
        if (overField.type === 'container') {
            setDragOverContainer(overField.name);
            return;
        }
        setDragOverContainer(locateField(fields, overField.name)?.containerName ?? null);
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        setDragOverContainer(null);
        if (!over || active.id === over.id) return;

        const activeName = String(active.id);
        const overName = String(over.id);

        const activeField = findFieldByName(fields, activeName);
        const overField = findFieldByName(fields, overName);
        if (!activeField || !overField) return;

        const overIsContainer = overField.type === 'container';

        // Container tidak boleh masuk ke dalam container (schema membatasi
        // nesting 1 level) — pindahan container hanya valid antar top-level.
        if (activeField.type === 'container' && overIsContainer) return;

        const activeLoc = locateField(fields, activeName);
        const overLoc = locateField(fields, overName);

        // Drop di atas tile container → pindah masuk ke container itu
        // (append ke akhir; kalau sudah di dalam → jadi reorder ke akhir).
        if (overIsContainer) {
            onMoveField?.(activeName, { containerName: overName });
            return;
        }

        if (!activeLoc || !overLoc) return;

        // Sama-sama top-level → reorder biasa (semantik arrayMove).
        if (!activeLoc.containerName && !overLoc.containerName) {
            onReorder(activeLoc.index, overLoc.index);
            return;
        }

        // Di dalam container yang sama → reorder dalam container.
        if (activeLoc.containerName && activeLoc.containerName === overLoc.containerName) {
            onMoveField?.(activeName, { containerName: activeLoc.containerName, index: overLoc.index });
            return;
        }

        // Lintas level / lintas container: masuk ke container, atau keluar ke top-level.
        onMoveField?.(
            activeName,
            overLoc.containerName
                ? { containerName: overLoc.containerName, index: overLoc.index }
                : { containerName: null, index: overLoc.index }
        );
    }

    if (fields.length === 0) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <div className="flex flex-col items-center px-8 text-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 shadow-lg shadow-blue-600/10">
                        <PlusIcon className="h-6 w-6" />
                    </div>
                    <h3 className="text-base font-semibold text-gray-800">Belum ada field</h3>
                    <p className="mt-1 max-w-[280px] text-[13px] leading-relaxed text-gray-400">
                        Pilih salah satu tipe field di Palette di sebelah kiri untuk mulai membangun form.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-auto p-4">
            <div className="relative">
                {/* pt-10 memberi ruang di atas baris pertama supaya type-badge &
            toolbar (-top-8) tidak terpotong oleh scroll container. */}
                <div className="relative space-y-1 pt-10">
                    <DndContext
                        sensors={sensors}
                        onDragOver={handleDragOver}
                        onDragEnd={handleDragEnd}
                        onDragCancel={() => setDragOverContainer(null)}
                    >
                        <SortableContext items={fields.map((f) => f.name)} strategy={verticalListSortingStrategy}>
                            <FieldList
                                fields={fields}
                                control={control}
                                watchedValues={watchedValues}
                                containerInnerWrapper={(inner, _depth, containerField) => (
                                    <SortableContext
                                        key={containerField.name}
                                        items={(containerField.children ?? []).map((c) => c.name)}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {inner}
                                    </SortableContext>
                                )}
                                renderFieldWrapper={(field, rendered) => {
                                    const typeLabel = registry[field.type]?.paletteLabel ?? field.type;
                                    const startColSpan = field.layout?.colSpan ?? GRID_COLUMNS;
                                    const resizable = field.type !== 'container';

                                    return (
                                        <SortableFieldWrapper
                                            key={field.name}
                                            id={field.name}
                                            selected={selectedFieldName === field.name}
                                            typeLabel={typeLabel}
                                            required={!!field.required}
                                            startColSpan={startColSpan}
                                            resizable={resizable}
                                            highlightDrop={
                                                field.type === 'container' && dragOverContainer === field.name
                                            }
                                            onSelect={() => onSelectField(field.name)}
                                            onDuplicate={() => onDuplicate?.(field.name)}
                                            onToggleRequired={() => onToggleRequired?.(field)}
                                            onDelete={() => onDelete?.(field.name)}
                                            onResize={(colSpan) =>
                                                onUpdateField?.({
                                                    ...field,
                                                    layout: { ...field.layout, colSpan: colSpan as ColSpan },
                                                })
                                            }
                                        >
                                            {rendered}
                                        </SortableFieldWrapper>
                                    );
                                }}
                            />
                        </SortableContext>
                    </DndContext>
                </div>
            </div>
        </div>
    );
}