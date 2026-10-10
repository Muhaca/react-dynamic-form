import type { Control } from 'react-hook-form';
import type { CSSProperties, ReactNode } from 'react';
import type { FieldConfig, ConditionExpr } from '../core';
import { GRID_COLUMNS } from '../core';
import { useFieldRegistry } from './FieldRegistryContext';

export interface FieldListProps {
    fields: FieldConfig[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any>;
    watchedValues: Record<string, unknown>;
    renderFieldWrapper?: (field: FieldConfig, rendered: ReactNode, depth: number) => ReactNode;
    /** Slot opsional untuk membungkus grid children di dalam container. Murni
     * generic — dipakai builder buat menyuntik SortableContext (nested drag),
     * container palsu/penanda, dsb. Lewati saja kalau tidak diperlukan. */
    containerInnerWrapper?: (
        children: ReactNode,
        depth: number,
        container: FieldConfig
    ) => ReactNode;
    /** Internal — jangan diisi manual, dipakai FieldList sendiri waktu rekursi ke dalam container. */
    depth?: number;
}

function evaluateCondition(condition: ConditionExpr | undefined, values: Record<string, unknown>): boolean {
    if (!condition) return true;
    const current = values[condition.field];

    switch (condition.operator) {
        case 'eq':
            return current === condition.value;
        case 'neq':
            return current !== condition.value;
        case 'gt':
            return typeof current === 'number' && typeof condition.value === 'number' && current > condition.value;
        case 'lt':
            return typeof current === 'number' && typeof condition.value === 'number' && current < condition.value;
        case 'in':
            return Array.isArray(condition.value) && condition.value.includes(current);
        default:
            return true;
    }
}

const GRID_STYLE: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${GRID_COLUMNS}, minmax(0, 1fr))`,
    gap: '1rem',
    alignItems: 'start',
};

export function FieldList({
    fields,
    control,
    watchedValues,
    renderFieldWrapper,
    containerInnerWrapper,
    depth = 0,
}: FieldListProps) {
    const registry = useFieldRegistry();
    const visibleFields = fields.filter((field) => evaluateCondition(field.visibleWhen, watchedValues));

    return (
        <div style={GRID_STYLE}>
            {visibleFields.map((field) => {
                const colSpan = field.layout?.colSpan ?? GRID_COLUMNS;
                let rendered: ReactNode;

                if (field.type === 'container') {
                    const nestedChildren = (
                        <FieldList
                            fields={field.children ?? []}
                            control={control}
                            watchedValues={watchedValues}
                            renderFieldWrapper={renderFieldWrapper}
                            depth={depth + 1}
                        />
                    );
                    const ContainerRenderer = registry.container;
                    const inner = containerInnerWrapper
                        ? containerInnerWrapper(nestedChildren, depth + 1, field)
                        : nestedChildren;
                    rendered = ContainerRenderer ? (
                        <ContainerRenderer field={field} control={control}>
                            {inner}
                        </ContainerRenderer>
                    ) : (
                        inner
                    );
                } else {
                    const Renderer = registry[field.type];
                    if (!Renderer) {
                        console.warn(`[dynamic-form] Tidak ada renderer terdaftar untuk field type "${field.type}"`);
                        return null;
                    }
                    rendered = <Renderer field={field} control={control} />;
                }

                const wrapped = renderFieldWrapper ? renderFieldWrapper(field, rendered, depth) : rendered;

                return (
                    <div key={field.name} style={{ gridColumn: `span ${colSpan} / span ${colSpan}`, minWidth: 0 }}>
                        {wrapped}
                    </div>
                );
            })}
        </div>
    );
}