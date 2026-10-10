import { type FieldConfig, type FieldType, type FieldValidation, UI_ONLY_FIELD_TYPES } from './types';

function toPrimitiveType(type: FieldType): string {
    switch (type) {
        case 'number':
        case 'currency':
        case 'rating':
            return 'number';
        case 'checkbox':
        case 'yesno':
            return 'boolean';
        case 'multiselect':
        case 'table':
            return 'array';
        case 'text':
        case 'textarea':
        case 'select':
        case 'date':
        case 'email':
        case 'phone':
        case 'time':
        case 'radio':
        case 'file':
        case 'address':
        default:
            return 'string';
    }
}

/**
 * Petakan `FieldValidation` (kontrak frontend) ke keyword JSON Schema yang
 * VALID. `min`/`max` di kontrak adalah batas NILAI numerik → keyword yang
 * benar `minimum`/`maximum` (spread `min`/`max` mentah-mentah diam-diam
 * diabaikan oleh Ajv — itu bug yang pernah terjadi, jangan dikembalikan).
 */
function mapValidation(validation: FieldValidation | undefined): Record<string, unknown> {
    if (!validation) return {};
    return {
        ...(typeof validation.minLength === 'number' ? { minLength: validation.minLength } : {}),
        ...(typeof validation.maxLength === 'number' ? { maxLength: validation.maxLength } : {}),
        ...(typeof validation.min === 'number' ? { minimum: validation.min } : {}),
        ...(typeof validation.max === 'number' ? { maximum: validation.max } : {}),
        ...(validation.pattern ? { pattern: validation.pattern } : {}),
        ...(validation.format ? { format: validation.format } : {}),
    };
}

/**
 * "Ratakan" fields — container BUKAN properti data (tidak punya value sendiri)
 * dan tipe UI-only (heading/divider/chart) juga murni tampilan, jadi keduanya
 * tidak masuk hasil flatten, tapi children container tetap dimasukkan
 * setingkat field lain.
 */
export function flattenFields(fields: FieldConfig[]): FieldConfig[] {
    return fields.flatMap((field) => {
        if (field.type === 'container') return flattenFields(field.children ?? []);
        if (UI_ONLY_FIELD_TYPES.has(field.type)) return [];
        return [field];
    });
}

export function generateJsonSchema(fields: FieldConfig[]): Record<string, unknown> {
    const properties: Record<string, unknown> = {};
    const required: string[] = [];

    for (const field of flattenFields(fields)) {
        const type = toPrimitiveType(field.type);
        const property: Record<string, unknown> = {
            type,
            ...mapValidation(field.validation),
        };

        switch (field.type) {
            case 'select':
            case 'radio':
                if (field.options && field.options.length > 0) {
                    property.enum = field.options.map((opt) => opt.value);
                }
                break;
            case 'multiselect': {
                const items: Record<string, unknown> = { type: 'string' };
                if (field.options && field.options.length > 0) {
                    items.enum = field.options.map((opt) => opt.value);
                }
                property.items = items;
                property.uniqueItems = true;
                // required = minimal 1 pilihan dipilih (default [] bikin key
                // selalu ada, jadi `required` Ajv saja tidak cukup).
                if (field.required) {
                    property.minItems = 1;
                }
                break;
            }
            case 'rating':
                property.integer = true;
                property.minimum = 1;
                property.maximum = field.maxRating ?? 5;
                break;
            case 'email':
                if (!field.validation?.format) property.format = 'email';
                break;
            case 'phone':
                if (!field.validation?.format) property.format = 'phone';
                break;
            case 'table':
                property.items = {
                    type: 'array',
                    items: { type: 'string' },
                };
                break;
            default:
                break;
        }

        // required string: JSON Schema `required` cuma cek key ADA, bukan value
        // tidak kosong (`defaultValue ?? ''` bikin key selalu ada). Auto-tambah
        // `minLength: 1` untuk field string yang required — fix yang disengaja,
        // JANGAN dihapus. Kalau user sudah set minLength sendiri, itu dipakai.
        if (field.required && type === 'string' && typeof property.minLength === 'undefined') {
            property.minLength = 1;
        }

        properties[field.name] = property;

        if (field.required) {
            required.push(field.name);
        }
    }

    return {
        type: 'object',
        properties,
        ...(required.length > 0 ? { required } : {}),
    };
}