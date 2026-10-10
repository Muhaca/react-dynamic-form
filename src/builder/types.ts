import type { ComponentType } from 'react';
import type { FieldConfig, FieldType } from '../core';

/**
 * Props yang diterima tiap PropertyEditor. Beda dari FieldRendererProps di
 * dynamic-form-react — ini mengedit DEFINISI field (skema), bukan VALUE field.
 */
export interface PropertyEditorProps {
  field: FieldConfig;
  onChange: (updated: FieldConfig) => void;
}

/**
 * Satu entry registry builder untuk satu FieldType. `type` di sini SELALU
 * merujuk ke union FieldType dari @yourorg/dynamic-form-core — bukan daftar
 * type baru. Kalau core menambah FieldType baru, TypeScript akan menandai
 * registry mana saja yang belum lengkap (lihat BuilderFieldRegistry di bawah).
 */
export interface FieldTypeDefinition {
  type: FieldType;
  paletteLabel: string;
  paletteIcon?: ComponentType<{ className?: string; }>;
  /**
   * Nilai default field baru saat ditambahkan dari Palette.
   * `name` sengaja TIDAK diisi di sini — keunikan name di-generate terpusat
   * oleh useFormBuilder, bukan oleh tiap createDefault (lihat pembahasan kita).
   */
  createDefault: () => Omit<FieldConfig, 'name'>;
  PropertyEditor: ComponentType<PropertyEditorProps>;
}

export type BuilderFieldRegistry = Partial<Record<FieldType, FieldTypeDefinition>>;