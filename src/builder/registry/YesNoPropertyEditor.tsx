import type { PropertyEditorProps } from '../types';
import { FieldGroup, Segmented } from '../ui';

export function YesNoPropertyEditor({ field, onChange }: PropertyEditorProps) {
    return (
        <FieldGroup label="Nilai Default">
            <Segmented
                value={field.defaultValue === false ? 'no' : 'yes'}
                options={[
                    { value: 'yes', label: 'Ya' },
                    { value: 'no', label: 'Tidak' },
                ]}
                onChange={(value) => onChange({ ...field, defaultValue: value === 'yes' })}
                ariaLabel="Nilai default"
            />
        </FieldGroup>
    );
}