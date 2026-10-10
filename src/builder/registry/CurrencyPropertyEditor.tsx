import type { PropertyEditorProps } from '../types';
import { FieldGroup, Segmented, editorInputClass } from '../ui';

const SYMBOLS = ['Rp', '$', '€'] as const;
const activeSymbol = (symbol?: string): (typeof SYMBOLS)[number] | null =>
    symbol && SYMBOLS.includes(symbol as (typeof SYMBOLS)[number]) ? (symbol as (typeof SYMBOLS)[number]) : null;

export function CurrencyPropertyEditor({ field, onChange }: PropertyEditorProps) {
    const symbol = field.symbol ?? 'Rp';
    const active = activeSymbol(symbol);

    return (
        <div className="space-y-3.5">
            <FieldGroup label="Simbol mata uang">
                <Segmented<(typeof SYMBOLS)[number]>
                    value={active ?? SYMBOLS[0]}
                    options={SYMBOLS.map((s) => ({ value: s, label: s }))}
                    onChange={(value) => onChange({ ...field, symbol: value })}
                    ariaLabel="Simbol mata uang"
                />
            </FieldGroup>
            {!active && (
                <FieldGroup label="Simbol kustom">
                    <input
                        className={editorInputClass}
                        type="text"
                        value={symbol}
                        onChange={(e) => onChange({ ...field, symbol: e.target.value })}
                    />
                </FieldGroup>
            )}
        </div>
    );
}