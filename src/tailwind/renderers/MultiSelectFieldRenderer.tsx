import { Controller } from 'react-hook-form';
import type { FieldRendererProps } from '../../react';

export function MultiSelectFieldRenderer({ field, control }: FieldRendererProps) {
  return (
    <Controller
      name={field.name}
      control={control}
      defaultValue={Array.isArray(field.defaultValue) ? field.defaultValue : []}
      render={({ field: rhfField, fieldState }) => {
        const value: unknown[] = Array.isArray(rhfField.value) ? rhfField.value : [];

        function isChecked(optValue: unknown): boolean {
          return value.some((v) => String(v) === String(optValue));
        }

        function toggle(optValue: unknown): void {
          const next = isChecked(optValue)
            ? value.filter((v) => String(v) !== String(optValue))
            : [...value, optValue];
          rhfField.onChange(next);
        }

        return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {field.options?.map((opt) => (
              <label
                key={opt.value}
                className="flex items-center gap-2 mb-1.5 text-sm text-gray-700"
              >
                <input
                  type="checkbox"
                  checked={isChecked(opt.value)}
                  onChange={() => toggle(opt.value)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-200"
                />
                {opt.label}
              </label>
            ))}
            {fieldState.error && (
              <p className="mt-1 text-sm text-red-500">{fieldState.error.message}</p>
            )}
          </div>
        );
      }}
    />
  );
}