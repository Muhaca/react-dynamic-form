import type { ReactNode } from 'react';
import { ChevronDownIcon } from './registry/icons';

export const editorInputClass =
    'w-full rounded-md border border-gray-300 bg-white px-2.5 py-2 text-[13px] text-gray-800 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100';
export const editorSelectClass = `${editorInputClass} pr-2`;
export const editorTextareaClass = `${editorInputClass} min-h-[52px] resize-y leading-relaxed`;

export interface FieldGroupProps {
    label?: string;
    hint?: string;
    className?: string;
    htmlFor?: string;
    children: ReactNode;
}

export function FieldGroup({ label, hint, className, htmlFor, children }: FieldGroupProps) {
    return (
        <div className={className}>
            {label && (
                <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-semibold text-gray-600">
                    {label}
                </label>
            )}
            {children}
            {hint && <p className="mt-1.5 text-[11px] leading-relaxed text-gray-400">{hint}</p>}
        </div>
    );
}

export interface SegmentedOption<T extends string> {
    value: T;
    label: ReactNode;
}

export function Segmented<T extends string>({
    value,
    options,
    onChange,
    ariaLabel,
}: {
    value: T;
    options: readonly SegmentedOption<T>[];
    onChange: (value: T) => void;
    ariaLabel?: string;
}) {
    return (
        <div role="radiogroup" aria-label={ariaLabel} className="flex gap-0.5 rounded-lg bg-gray-100 p-1">
            {options.map((option) => (
                <button
                    key={option.value}
                    type="button"
                    role="radio"
                    aria-checked={value === option.value}
                    onClick={() => onChange(option.value)}
                    className={`flex-1 rounded-md px-2 py-1.5 text-xs font-medium transition-colors ${
                        value === option.value
                            ? 'bg-white text-gray-900 shadow-sm ring-1 ring-gray-200'
                            : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
}

export function Toggle({
    checked,
    onChange,
    ariaLabel,
}: {
    checked: boolean;
    onChange: (checked: boolean) => void;
    ariaLabel?: string;
}) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={ariaLabel}
            onClick={() => onChange(!checked)}
            className={`h-5 w-[34px] shrink-0 rounded-full p-[2px] transition-colors ${
                checked ? 'bg-blue-500' : 'bg-gray-300'
            }`}
        >
            <span
                className={`block h-4 w-4 rounded-full bg-white shadow transition-transform ${
                    checked ? 'translate-x-[14px]' : 'translate-x-0'
                }`}
            />
        </button>
    );
}

export function WidthPicker({
    value,
    onChange,
    options = [1, 2, 3, 4],
    formatLabel,
}: {
    value: number;
    onChange: (value: number) => void;
    options?: readonly number[];
    formatLabel?: (value: number) => string;
}) {
    return (
        <div className="flex gap-1.5">
            {options.map((option) => {
                const active = value === option;
                return (
                    <button
                        key={option}
                        type="button"
                        onClick={() => onChange(option)}
                        className={`flex h-8 flex-1 items-center justify-center rounded-md border text-xs font-semibold transition-colors ${
                            active
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                        }`}
                    >
                        {formatLabel ? formatLabel(option) : `${option * 25}%`}
                    </button>
                );
            })}
        </div>
    );
}

export function SectionToggle({
    title,
    open,
    onToggle,
    children,
}: {
    title: ReactNode;
    open: boolean;
    onToggle: () => void;
    children: ReactNode;
}) {
    return (
        <div>
            <button
                type="button"
                onClick={onToggle}
                className="flex w-full items-center justify-between border-t border-gray-200 py-3 text-xs font-semibold text-gray-800"
            >
                {title}
                <ChevronDownIcon
                    className={`h-3.5 w-3.5 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
                />
            </button>
            {open && <div className="pb-4">{children}</div>}
        </div>
    );
}