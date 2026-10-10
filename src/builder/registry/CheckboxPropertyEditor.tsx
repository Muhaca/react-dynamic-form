import type { PropertyEditorProps } from '../types';
import { FieldGroup, Toggle } from '../ui';

export function CheckboxPropertyEditor({ field, onChange }: PropertyEditorProps) {
    return (
        <FieldGroup label="Default">
            <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-600">Tercentang secara default</span>
                <Toggle
                    checked={!!field.defaultValue}
                    onChange={(checked) => onChange({ ...field, defaultValue: checked })}
                    ariaLabel="Tercentang secara default"
                />
            </div>
        </FieldGroup>
    );
}