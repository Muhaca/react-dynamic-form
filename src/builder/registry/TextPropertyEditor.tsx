import type { PropertyEditorProps } from '../types';
import { FieldGroup, editorInputClass, editorSelectClass } from '../ui';

export function TextPropertyEditor({ field, onChange }: PropertyEditorProps) {
    return (
        <div className="space-y-3.5">
            <FieldGroup label="Placeholder">
                <input
                    className={editorInputClass}
                    type="text"
                    value={field.placeholder ?? ''}
                    placeholder="Ketik jawaban..."
                    onChange={(e) => onChange({ ...field, placeholder: e.target.value })}
                />
            </FieldGroup>
            <div className="grid grid-cols-2 gap-2">
                <FieldGroup label="Min. karakter">
                    <input
                        className={editorInputClass}
                        type="number"
                        value={field.validation?.minLength ?? ''}
                        onChange={(e) =>
                            onChange({
                                ...field,
                                validation: { ...field.validation, minLength: e.target.value ? Number(e.target.value) : undefined },
                            })
                        }
                    />
                </FieldGroup>
                <FieldGroup label="Maks. karakter">
                    <input
                        className={editorInputClass}
                        type="number"
                        value={field.validation?.maxLength ?? ''}
                        onChange={(e) =>
                            onChange({
                                ...field,
                                validation: { ...field.validation, maxLength: e.target.value ? Number(e.target.value) : undefined },
                            })
                        }
                    />
                </FieldGroup>
            </div>
            <FieldGroup label="Format">
                <select
                    className={editorSelectClass}
                    value={field.validation?.format ?? ''}
                    onChange={(e) =>
                        onChange({
                            ...field,
                            validation: {
                                ...field.validation,
                                format: (e.target.value || undefined) as 'email' | 'url' | 'phone' | undefined,
                            },
                        })
                    }
                >
                    <option value="">(tidak ada)</option>
                    <option value="email">Email</option>
                    <option value="url">URL</option>
                    <option value="phone">Nomor telepon</option>
                </select>
            </FieldGroup>
        </div>
    );
}