import { Controller } from 'react-hook-form';
import type { FieldRendererProps } from '../../react';

export function RatingFieldRenderer({ field, control }: FieldRendererProps) {
  const max = field.maxRating ?? 5;

  return (
    <Controller
      name={field.name}
      control={control}
      defaultValue={field.defaultValue ?? 0}
      render={({ field: rhfField, fieldState }) => {
        const value = Number(rhfField.value ?? 0);
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="flex items-center gap-1">
              {Array.from({ length: max }, (_, i) => i + 1).map((star) => {
                const active = star <= value;
                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() => rhfField.onChange(star)}
                    className={`text-2xl leading-none transition-colors ${active ? 'text-amber-400' : 'text-gray-300 hover:text-amber-300'
                      }`}
                    aria-label={`${star} dari ${max}`}
                  >
                    ★
                  </button>
                );
              })}
              <span className="ml-2 text-sm text-gray-500">
                {value > 0 ? `${value}/${max}` : 'Belum dinilai'}
              </span>
            </div>
            {fieldState.error && (
              <p className="mt-1 text-sm text-red-500">{fieldState.error.message}</p>
            )}
          </div>
        );
      }}
    />
  );
}