import { Controller } from 'react-hook-form';
import type { FieldRendererProps } from '../../react';

export function YesNoFieldRenderer({ field, control }: FieldRendererProps) {
  return (
    <Controller
      name={field.name}
      control={control}
      defaultValue={field.defaultValue ?? true}
      render={({ field: rhfField, fieldState }) => (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <div className="inline-flex rounded-md border border-gray-300 overflow-hidden">
            <button
              type="button"
              onClick={() => rhfField.onChange(true)}
              className={`px-4 py-1.5 text-sm font-medium transition-colors ${rhfField.value === true
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
            >
              Ya
            </button>
            <button
              type="button"
              onClick={() => rhfField.onChange(false)}
              className={`px-4 py-1.5 text-sm font-medium transition-colors ${rhfField.value === false
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
            >
              Tidak
            </button>
          </div>
          {fieldState.error && (
            <p className="mt-1 text-sm text-red-500">{fieldState.error.message}</p>
          )}
        </div>
      )}
    />
  );
}