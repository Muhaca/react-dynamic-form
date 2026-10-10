import { Controller } from 'react-hook-form';
import type { FieldRendererProps } from '../../react';

function emptyGrid(rows: number, columns: number): string[][] {
  return Array.from({ length: rows }, () => Array.from({ length: columns }, () => ''));
}

export function TableFieldRenderer({ field, control }: FieldRendererProps) {
  const rows = field.rows ?? 3;
  const columns = field.columns ?? 2;

  return (
    <Controller
      name={field.name}
      control={control}
      defaultValue={Array.isArray(field.defaultValue)
        ? field.defaultValue
        : emptyGrid(rows, columns)}
      render={({ field: rhfField, fieldState }) => {
        const grid: unknown[][] = Array.isArray(rhfField.value) ? rhfField.value : emptyGrid(rows, columns);

        function updateCell(r: number, c: number, v: string): void {
          const next = grid.map((row, ri) =>
            ri === r ? row.map((cell, ci) => (ci === c ? v : cell)) : row,
          );
          rhfField.onChange(next);
        }

        return (
          <div className="mb-4 overflow-x-auto">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="rounded-md border border-gray-300 overflow-hidden">
              <table className="w-full border-collapse">
                <tbody>
                  {grid.map((row, r) => (
                    <tr key={r} className="border-t border-gray-200 first:border-t-0">
                      {row.map((cell, c) => (
                        <td key={c} className="border-l border-gray-200 first:border-l-0 p-0">
                          <input
                            type="text"
                            value={String(cell ?? '')}
                            onChange={(e) => updateCell(r, c, e.target.value)}
                            placeholder={`${r + 1}.${c + 1}`}
                            className="w-full px-2 py-1.5 text-sm focus:outline-none focus:bg-blue-50"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
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