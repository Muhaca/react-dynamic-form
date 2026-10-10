import type { BackendSchemaResponse, ColSpan, FieldConfig, FormSchema } from './types';
import { generateJsonSchema } from './generateJsonSchema';

function normalizeField(f: FieldConfig, legacyGrid: boolean): FieldConfig {
  let layout = f.layout;
  if (legacyGrid && layout?.colSpan != null && layout.colSpan <= 4) {
    // Payload lama (sebelum grid 12 kolom): colSpan 1–4 diterjemahkan ×3 supaya
    // 1→3 (25%), 2→6 (50%), 3→9 (75%), 4→12 (100%) — tampilan identik dulu.
    layout = { ...layout, colSpan: (layout.colSpan * 3) as ColSpan };
  }
  return {
    name: f.name,
    type: f.type,
    label: f.label,
    required: f.required ?? false,
    description: f.description,
    options: f.options,
    defaultValue: f.defaultValue,
    visibleWhen: f.visibleWhen,
    placeholder: f.placeholder,
    validation: f.validation,
    layout,
    children: f.children?.map((child) => normalizeField(child, legacyGrid)),
  };
}

export function parseSchema(raw: BackendSchemaResponse): FormSchema {
  if (!raw.formId) {
    throw new Error('parseSchema: formId tidak ditemukan di response backend');
  }

  // Payload modern menyebut gridColumns >= 12 → colSpan dipakai apa adanya.
  // Kalau absen/< 12, itu payload legacy grid-4 → colSpan 1–4 dimigrasikan ×3.
  const legacyGrid = raw.gridColumns == null || raw.gridColumns < 12;
  const fields: FieldConfig[] = raw.fields.map((field) => normalizeField(field, legacyGrid));

  return {
    id: raw.formId,
    version: raw.version,
    fields,
    jsonSchema: generateJsonSchema(fields),
  };
}