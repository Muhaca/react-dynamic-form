import type { PropertyEditorProps } from '../types';
import { FieldGroup, editorInputClass } from '../ui';

export function PhonePropertyEditor({ field, onChange }: PropertyEditorProps) {
    return (
        <FieldGroup label="Placeholder" hint="Validasi format nomor telepon aktif otomatis.">
            <input
                className={editorInputClass}
                type="text"
                value={field.placeholder ?? ''}
                placeholder="08xx-xxxx-xxxx"
                onChange={(e) => onChange({ ...field, placeholder: e.target.value })}
            />
        </FieldGroup>
    );
}