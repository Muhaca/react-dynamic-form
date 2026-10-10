import type { FieldRendererProps } from '../../react';

const BAR_DATA = [34, 52, 28, 46, 61];

export function ChartFieldRenderer({ field }: FieldRendererProps) {
  const type = field.chartType ?? 'bar';
  const height = field.chartHeight ?? 140;
  const max = Math.max(...BAR_DATA);

  return (
    <div className="mb-4">
      {field.label && (
        <p className="mb-2 text-sm font-medium text-gray-700">{field.label}</p>
      )}
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <svg
          width="100%"
          height={height}
          viewBox="0 0 200 100"
          preserveAspectRatio="none"
          role="img"
          aria-label={field.label || 'Grafik'}
        >
          {type === 'bar' &&
            BAR_DATA.map((v, i) => {
              const h = (v / max) * 80;
              const x = i * 38 + 12;
              return (
                <rect
                  key={i}
                  x={x}
                  y={100 - h}
                  width={30}
                  height={h}
                  rx={3}
                  className="text-indigo-400"
                  fill="currentColor"
                  opacity={0.4 + i * 0.15}
                />
              );
            })}

          {type === 'line' && (
            <polyline
              points="12,74 50,36 90,56 130,24 172,44"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-indigo-500"
            />
          )}

          {type === 'pie' && (
            <g transform="rotate(-90 100 55)">
              <circle
                cx="100"
                cy="55"
                r="28"
                fill="none"
                stroke="currentColor"
                strokeWidth="13"
                className="text-gray-200"
              />
              {[
                { pct: 0.42, cls: 'text-indigo-500' },
                { pct: 0.31, cls: 'text-teal-400' },
                { pct: 0.27, cls: 'text-amber-400' },
              ].map((seg) => {
                const len = 2 * Math.PI * 28 * seg.pct;
                return (
                  <circle
                    cx="100"
                    cy="55"
                    r="28"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="13"
                    strokeDasharray={`${len} ${2 * Math.PI * 28 - len}`}
                    className={seg.cls}
                  />
                );
              })}
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}