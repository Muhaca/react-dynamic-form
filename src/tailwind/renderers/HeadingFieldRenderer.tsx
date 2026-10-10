import type { FieldRendererProps } from '../../react';

const SIZE_CLASS: Record<string, string> = {
  h1: 'text-2xl font-bold text-gray-900 mb-4',
  h2: 'text-xl font-bold text-gray-900 mb-3',
  h3: 'text-lg font-semibold text-gray-800 mb-2',
  caption: 'text-xs uppercase tracking-wide text-gray-500 mb-2',
};

export function HeadingFieldRenderer({ field }: FieldRendererProps) {
  const size = field.textSize ?? 'h2';
  const Tag = size === 'caption' ? 'span' : (size as 'h1' | 'h2' | 'h3');

  return (
    <Tag className={`block ${SIZE_CLASS[size] ?? SIZE_CLASS.h2}`}>{field.label}</Tag>
  );
}