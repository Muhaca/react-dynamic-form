import { useBuilderFieldRegistry } from './BuilderFieldRegistryContext';
import type { FieldType } from '../core';
import type { FieldTypeDefinition } from './types';

export interface PaletteProps {
    onAddField: (type: FieldType) => void;
    targetContainerLabel?: string | null;
}

export function Palette({ onAddField, targetContainerLabel }: PaletteProps) {
    const registry = useBuilderFieldRegistry();
    const entries = Object.values(registry).filter(
        (entry): entry is FieldTypeDefinition => Boolean(entry)
    );

    return (
        <div className="w-56 shrink-0 border-r border-gray-200 p-3">
            <h3 className="text-xs font-semibold uppercase text-gray-500 mb-1">
                Tambah Field
            </h3>
            <p className="text-xs text-gray-400 mb-2">
                {targetContainerLabel ? (
                    <>Masuk ke grup: <span className="font-medium text-gray-600">{targetContainerLabel}</span></>
                ) : (
                    'Masuk ke form utama'
                )}
            </p>
            <div className="flex flex-col gap-1">
                {entries.map((entry) => {
                    const Icon = entry.paletteIcon;
                    return (
                        <button
                            key={entry.type}
                            type="button"
                            onClick={() => onAddField(entry.type)}
                            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-left hover:bg-gray-100 transition-colors"
                        >
                            {Icon && <Icon className="w-4 h-4 text-gray-500" />}
                            {entry.paletteLabel}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}