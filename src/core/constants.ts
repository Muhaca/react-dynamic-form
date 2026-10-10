/**
 * Jumlah kolom grid form. Lebar field diukur dalam satuan kolom
 * (`layout.colSpan`), default selebar penuh = GRID_COLUMNS.
 *
 * Dipakai: FieldList (render engine), builder Canvas/FieldResizeHandle/
 * PropertyPanel. JANGAN hardcode angka ini di file lain — selalu import dari sini.
 */
export const GRID_COLUMNS = 12;