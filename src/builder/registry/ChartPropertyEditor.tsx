import type { PropertyEditorProps } from '../types';
import { FieldGroup, Segmented, editorInputClass } from '../ui';

const TYPES = [
    { value: 'bar', label: 'Bar' },
    { value: 'line', label: 'Line' },
    { value: 'pie', label: 'Pie' },
] as const;

export function ChartPropertyEditor({ field, onChange }: PropertyEditorProps) {
    return (
        <div className="space-y-3.5">
            <FieldGroup label="Tipe Grafik">
                <Segmented<'bar' | 'line' | 'pie'>
                    value={field.chartType ?? 'bar'}
                    options={TYPES}
                    onChange={(chartType) => onChange({ ...field, chartType })}
                    ariaLabel="Tipe grafik"
                />
            </FieldGroup>
            <FieldGroup label="Tinggi (px)">
                <input
                    className={editorInputClass}
                    type="number"
                    min={48}
                    value={field.chartHeight ?? 140}
                    onChange={(e) =>
                        onChange({
                            ...field,
                            chartHeight: e.target.value ? Math.max(48, Number(e.target.value)) : 140,
                        })
                    }
                />
            </FieldGroup>
        </div>
    );
}