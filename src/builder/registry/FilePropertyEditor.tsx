import type { PropertyEditorProps } from '../types';
import { FieldGroup, editorInputClass } from '../ui';

export function FilePropertyEditor({ field, onChange }: PropertyEditorProps) {
    return (
        <FieldGroup label="Ekstensi file yang diizinkan" hint="Contoh: .pdf,.jpg (kosongkan untuk semua).">
            <input
                className={editorInputClass}
                type="text"
                value={field.accept ?? ''}
                placeholder="* (semua)"
                onChange={(e) => onChange({ ...field, accept: e.target.value })}
            />
        </FieldGroup>
    );
}