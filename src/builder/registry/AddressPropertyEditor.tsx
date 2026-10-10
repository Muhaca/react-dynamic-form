import type { PropertyEditorProps } from '../types';
import { FieldGroup, editorInputClass } from '../ui';

export function AddressPropertyEditor({ field, onChange }: PropertyEditorProps) {
    return (
        <FieldGroup label="Placeholder">
            <input
                className={editorInputClass}
                type="text"
                value={field.placeholder ?? ''}
                placeholder="Jalan, kota, provinsi..."
                onChange={(e) => onChange({ ...field, placeholder: e.target.value })}
            />
        </FieldGroup>
    );
}