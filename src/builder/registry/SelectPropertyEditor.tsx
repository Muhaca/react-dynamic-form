import type { PropertyEditorProps } from '../types';
import type { FieldOption } from '../../core';
import { FieldGroup } from '../ui';
import { CopyIcon, PlusIcon, TrashIcon } from './icons';

const shapeClass = (type: string) => (type === 'radio' ? 'rounded-full' : 'rounded-[4px]');

export function SelectPropertyEditor({ field, onChange }: PropertyEditorProps) {
    const options = field.options ?? [];

    function updateOption(index: number, updated: Partial<FieldOption>) {
        const next = options.map((opt, i) => (i === index ? { ...opt, ...updated } : opt));
        onChange({ ...field, options: next });
    }

    function addOption() {
        const next: FieldOption[] = [...options, { label: `Opsi ${options.length + 1}`, value: `opsi_${options.length + 1}` }];
        onChange({ ...field, options: next });
    }

    function removeOption(index: number) {
        onChange({ ...field, options: options.filter((_, i) => i !== index) });
    }

    function duplicateOption(index: number) {
        const source = options[index];
        const duplicate: FieldOption = {
            ...source,
            label: `${source.label} (salinan)`,
            value: `${source.value}_salinan`,
        };
        const next = [...options];
        next.splice(index + 1, 0, duplicate);
        onChange({ ...field, options: next });
    }

    return (
        <FieldGroup label="Opsi Pilihan">
            {options.length === 0 && (
                <p className="mb-2 text-[11px] text-gray-400">Belum ada opsi. Tambahkan minimal satu.</p>
            )}
            {options.map((opt, index) => (
                <div key={index} className="mb-2 flex items-center gap-1.5">
                    <span className={`h-3.5 w-3.5 shrink-0 border-[1.5px] border-gray-400 ${shapeClass(field.type)}`} />
                    <input
                        type="text"
                        value={opt.label}
                        placeholder="Label"
                        title="Label yang ditampilkan"
                        onChange={(e) => updateOption(index, { label: e.target.value })}
                        className="min-w-0 flex-1 rounded-md border border-gray-300 px-2 py-1.5 text-[12.5px]"
                    />
                    <input
                        type="text"
                        value={String(opt.value)}
                        placeholder="key"
                        title="Value (key data)"
                        onChange={(e) => updateOption(index, { value: e.target.value })}
                        className="w-[72px] shrink-0 rounded-md border border-gray-200 px-1.5 py-1.5 font-mono text-[11px] text-gray-400"
                    />
                    <button
                        type="button"
                        onClick={() => duplicateOption(index)}
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
                        aria-label="Duplikat opsi"
                    >
                        <CopyIcon className="h-3 w-3" />
                    </button>
                    <button
                        type="button"
                        onClick={() => removeOption(index)}
                        disabled={options.length <= 1}
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-40 disabled:hover:bg-transparent"
                        aria-label="Hapus opsi"
                    >
                        <TrashIcon className="h-3 w-3" />
                    </button>
                </div>
            ))}
            <button
                type="button"
                onClick={addOption}
                className="mt-1 flex items-center gap-1.5 text-xs font-medium text-blue-600 transition-colors hover:text-blue-700"
            >
                <PlusIcon className="h-3.5 w-3.5" />
                Tambah opsi
            </button>
        </FieldGroup>
    );
}