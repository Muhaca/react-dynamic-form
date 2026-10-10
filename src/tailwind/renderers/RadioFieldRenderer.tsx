import { Controller } from 'react-hook-form';
import type { FieldRendererProps } from '../../react';

export function RadioFieldRenderer({ field, control }: FieldRendererProps) {
  return (
    <Controller
      name={field.name}
      control={control}
      defaultValue={field.defaultValue ?? ''}
      render={({ field: rhfField, fieldState }) => (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {field.options?.map((opt, index) => (
            <label key={opt.value} className="flex items-center gap-2 mb-1.5 text-sm text-gray-700">
              <input
                type="radio"
                name={rhfField.name}
                checked={String(rhfField.value) === String(opt.value)}
                onChange={() => rhfField.onChange(opt.value)}
                onBlur={rhfField.onBlur}
                ref={index === 0 ? rhfField.ref : undefined}
                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-200"
              />
              {opt.label}
            </label>
          ))}
          {fieldState.error && (
            <p className="mt-1 text-sm text-red-500">{fieldState.error.message}</p>
          )}
        </div>
      )}
    />
  );
}