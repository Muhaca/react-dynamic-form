import type { FieldConfig } from '../core';
import { useFormBuilder } from './useFormBuilder';
import { Palette } from './Palette';
import { Canvas } from './Canvas';
import { PropertyPanel } from './PropertyPanel';

export interface FormBuilderProps {
    initialFields?: FieldConfig[];
    onSave: (fields: FieldConfig[]) => void;
    onCancel?: () => void;
}

export function FormBuilder({ initialFields, onSave, onCancel }: FormBuilderProps) {
    const {
        fields,
        selectedFieldName,
        selectedField,
        addField,
        removeField,
        updateField,
        reorderFields,
        selectField,
    } = useFormBuilder({ initialFields });

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-2">
                <h2 className="text-sm font-medium">Form Builder</h2>
                <div className="flex gap-2">
                    {onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="text-sm px-3 py-1.5 rounded-md border border-gray-300 hover:bg-gray-50"
                        >
                            Batal
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={() => onSave(fields)}
                        className="text-sm px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                    >
                        Simpan
                    </button>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                <Palette
                    onAddField={addField}
                    targetContainerLabel={selectedField?.type === 'container' ? selectedField.label : null}
                />
                <Canvas
                    fields={fields}
                    selectedFieldName={selectedFieldName}
                    onSelectField={selectField}
                    onReorder={reorderFields}
                />
                <PropertyPanel
                    selectedField={selectedField}
                    onChange={(updated) => updateField(updated.name, updated)}
                    onRemove={removeField}
                />
            </div>
        </div>
    );
}