import type { PropertyEditorProps } from '../types';
import { FieldGroup, editorInputClass } from '../ui';

export function NumberPropertyEditor({ field, onChange }: PropertyEditorProps) {
    return (
        <div className="grid grid-cols-2 gap-2">
            <FieldGroup label="Min">
                <input
                    className={editorInputClass}
                    type="number"
                    value={field.validation?.min ?? ''}
                    onChange={(e) =>
                        onChange({
                            ...field,
                            validation: { ...field.validation, min: e.target.value ? Number(e.target.value) : undefined },
                        })
                    }
                />
            </FieldGroup>
            <FieldGroup label="Maks">
                <input
                    className={editorInputClass}
                    type="number"
                    value={field.validation?.max ?? ''}
                    onChange={(e) =>
                        onChange({
                            ...field,
                            validation: { ...field.validation, max: e.target.value ? Number(e.target.value) : undefined },
                        })
                    }
                />
            </FieldGroup>
        </div>
    );
}