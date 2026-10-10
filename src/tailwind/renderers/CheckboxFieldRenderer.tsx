import { Controller } from 'react-hook-form';
import type { FieldRendererProps } from '../../react';

export function CheckboxFieldRenderer({ field, control }: FieldRendererProps) {
  return (
    <Controller
      name={field.name}
      control={control}
      defaultValue={field.defaultValue ?? false}
      render={({ field: rhfField, fieldState }) => (
        <div className="mb-4">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              checked={!!rhfField.value}
              onChange={(e) => rhfField.onChange(e.target.checked)}
              onBlur={rhfField.onBlur}
              name={rhfField.name}
              ref={rhfField.ref}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-200"
            />
            {field.label}
          </label>
          {fieldState.error && (
            <p className="mt-1 text-sm text-red-500">{fieldState.error.message}</p>
          )}
        </div>
      )}
    />
  );
}
