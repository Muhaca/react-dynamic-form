import type { PropertyEditorProps } from '../types';
import { FieldGroup, editorInputClass } from '../ui';

export function EmailPropertyEditor({ field, onChange }: PropertyEditorProps) {
    return (
        <FieldGroup
            label="Placeholder"
            hint="Notifikasi email aktif otomatis — tidak perlu set format manual."
        >
            <input
                className={editorInputClass}
                type="text"
                value={field.placeholder ?? ''}
                placeholder="nama@email.com"
                onChange={(e) => onChange({ ...field, placeholder: e.target.value })}
            />
        </FieldGroup>
    );
}