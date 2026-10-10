export type FieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'select'
  | 'date'
  | 'checkbox'
  | 'container'
  | 'email'
  | 'phone'
  | 'time'
  | 'radio'
  | 'multiselect'
  | 'yesno'
  | 'file'
  | 'rating'
  | 'currency'
  | 'address'
  | 'table'
  | 'heading'
  | 'divider'
  | 'chart';

/**
 * Tipe field yang MURNI tampilan (tidak membawa data) — tidak pernah masuk
 * hasil flattenFields / JSON Schema (sama seperti `container`).
 */
export const UI_ONLY_FIELD_TYPES: ReadonlySet<FieldType> = new Set(['heading', 'divider', 'chart']);

export interface FieldOption {
  label: string;
  value: string | number;
}

export interface ConditionExpr {
  field: string;
  operator: 'eq' | 'neq' | 'gt' | 'lt' | 'in';
  value: unknown;
}

export interface FieldValidation {
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: string;
  format?: 'email' | 'url' | 'phone';
}

/** Satuan lebar field dalam grid (1..GRID_COLUMNS). */
export type ColSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

/** Satuan lebar field dalam grid. GRID_COLUMNS = 12 kolom, default (kalau tidak diisi) = selebar penuh. */
export interface FieldLayout {
  colSpan?: ColSpan;
}

export interface FieldConfig {
  name: string;
  type: FieldType;
  label: string;
  required?: boolean;
  description?: string;
  options?: FieldOption[];
  defaultValue?: unknown;
  visibleWhen?: ConditionExpr;
  placeholder?: string;
  /**
   * Properti opsional per tipe spesifik:
   * - `textSize`  → 'heading' (ukuran judul h1/h2/h3/caption)
   * - `maxRating` → 'rating' (jumlah bintang, default 5)
   * - `symbol`    → 'currency' (awalan simbol, default 'Rp')
   * - `accept`    → 'file' (filter file input, default semua)
   * - `rows`/`columns` → 'table' (ukuran matriks, default 3×2)
   * - `chartType`/`chartHeight` → 'chart' (tipe & tinggi grafik)
   */
  textSize?: 'h1' | 'h2' | 'h3' | 'caption';
  maxRating?: number;
  symbol?: string;
  accept?: string;
  rows?: number;
  columns?: number;
  chartType?: 'bar' | 'line' | 'pie';
  chartHeight?: number;
  validation?: FieldValidation;
  layout?: FieldLayout;
  /**
   * HANYA dipakai kalau type === 'container'. Berisi field-field di dalamnya,
   * yang masing-masing tetap jadi KEY DATA level atas (container murni
   * konstruksi layout, bukan pengelompokan data). Saat ini dibatasi 1 level
   * (children tidak boleh berisi container lagi).
   */
  children?: FieldConfig[];
}

export interface FormSchema {
  id: string;
  version: string;
  fields: FieldConfig[];
  jsonSchema: Record<string, unknown>;
}

export interface BackendSchemaResponse {
  formId: string;
  version: string;
  fields: FieldConfig[];
  /**
   * Jumlah kolom grid yang dipakai untuk menafsirkan `layout.colSpan`.
   * Absen atau < 12 → ditafsirkan sebagai grid 4 kolom legacy (nilai 1–4
   * dimigrasikan ×3 oleh parser). Kirim 12 untuk payload modern.
   */
  gridColumns?: number;
}

export interface ValidationError {
  path: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

/* ============================================================
   DASHBOARD (Page) — menggabungkan beberapa form jadi satu alur
   Model mengikuti prototipe: Page (level 1) → Block (level 2) → Form.
   Block MENGACU ke entity form yang terpisah (DashboardFormRef.formId),
   bukan salinan inline. text/divider adalah block dekoratif.
============================================================*/

export type DashboardTextSize = 'h1' | 'h2' | 'h3';

export interface DashboardFormRef {
  /** id entity form yang sudah ada (contoh: 'playground-form'). */
  formId: string;
  /** Label tampilan opsional; kalau kosong render pakai data form tsb. */
  label?: string;
}

/** Block yang menampung 1..n form (klik → buka block editor / form editor). */
export interface DashboardFormBlock {
  id: string;
  type: 'formblock';
  title: string;
  description?: string;
  colSpan: ColSpan;
  forms: DashboardFormRef[];
}

/** Block dekoratif heading. */
export interface DashboardTextBlock {
  id: string;
  type: 'text';
  title: string;
  textSize?: DashboardTextSize;
}

/** Block dekoratif garis pemisah. */
export interface DashboardDividerBlock {
  id: string;
  type: 'divider';
}

export type DashboardBlock =
  | DashboardFormBlock
  | DashboardTextBlock
  | DashboardDividerBlock;

/** Satu halaman dashboard: judul + rangkaian block. */
export interface DashboardSpec {
  id: string;
  name: string;
  description?: string;
  blocks: DashboardBlock[];
}