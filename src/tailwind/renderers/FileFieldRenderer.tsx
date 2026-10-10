import { Controller } from 'react-hook-form';
import type { FieldRendererProps } from '../../react';

export function FileFieldRenderer({ field, control }: FieldRendererProps) {
  return (
    <Controller
      name={field.name}
      control={control}
      defaultValue={field.defaultValue ?? ''}
      render={({ field: rhfField, fieldState }) => (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <input
            type="file"
            accept={field.accept ?? '*'}
            onChange={(e) => rhfField.onChange(e.target.files?.[0]?.name ?? '')}
            className="block w-full text-sm text-gray-500 file:mr-3 file:rounded-md file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:text-sm file:font-medium file:text-blue-600 hover:file:bg-blue-100"
          />
          {rhfField.value ? (
            <p className="mt-1 text-xs text-gray-500">File terpilih: {String(rhfField.value)}</p>
          ) : (
            <p className="mt-1 text-xs text-gray-400">Nama file akan tersimpan sebagai nilai field.</p>
          )}
          {fieldState.error && (
            <p className="mt-1 text-sm text-red-500">{fieldState.error.message}</p>
          )}
        </div>
      )}
    />
  );
}