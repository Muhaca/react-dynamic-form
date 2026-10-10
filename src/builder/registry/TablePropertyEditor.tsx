import type { PropertyEditorProps } from '../types';
import { FieldGroup, WidthPicker, editorInputClass } from '../ui';

const ROW_OPTIONS = [2, 3, 4, 5, 6] as const;

export function TablePropertyEditor({ field, onChange }: PropertyEditorProps) {
    return (
        <div className="space-y-3.5">
            <FieldGroup
                label="Banyak baris"
                hint="Responden biasanya dapat menambah baris sendiri saat mengisi."
            >
                <WidthPicker
                    value={field.rows ?? 3}
                    options={ROW_OPTIONS}
                    formatLabel={(n) => `${n}`}
                    onChange={(rows) => onChange({ ...field, rows })}
                />
            </FieldGroup>
            <FieldGroup label="Banyak kolom">
                <input
                    className={editorInputClass}
                    type="number"
                    min={1}
                    value={field.columns ?? 2}
                    onChange={(e) =>
                        onChange({
                            ...field,
                            columns: e.target.value ? Math.max(1, Number(e.target.value)) : 2,
                        })
                    }
                />
            </FieldGroup>
        </div>
    );
}