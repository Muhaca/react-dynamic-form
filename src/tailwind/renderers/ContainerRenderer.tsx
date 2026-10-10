import type { FieldRendererProps } from '../../react';

export function ContainerRenderer({ field, children }: FieldRendererProps) {
    return (
        <fieldset className="border border-gray-200 rounded-lg px-4 pb-4 pt-3 m-0">
            {field.label && (
                <legend className="text-xs font-medium text-gray-500 px-1">{field.label}</legend>
            )}
            {children}
        </fieldset>
    );
}