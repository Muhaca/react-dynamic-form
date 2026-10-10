import { Controller } from 'react-hook-form';
import type { FieldRendererProps } from '../../react';

export function AddressFieldRenderer({ field, control }: FieldRendererProps) {
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
          <textarea
            {...rhfField}
            rows={3}
            placeholder={field.placeholder ?? 'Jalan, nomor rumah, RT/RW, kelurahan, kota, provinsi, kode pos'}
            className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${fieldState.error
              ? 'border-red-500 focus:ring-red-200'
              : 'border-gray-300 focus:ring-blue-200'
              }`}
          />
          {fieldState.error && (
            <p className="mt-1 text-sm text-red-500">{fieldState.error.message}</p>
          )}
        </div>
      )}
    />
  );
}