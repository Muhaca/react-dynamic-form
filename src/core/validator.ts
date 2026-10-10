import type { ValidationError, ValidationResult } from './types'

export type Validator = (data: unknown) => ValidationResult

interface PropertySchema {
  type?: string
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
  pattern?: string
  format?: 'email' | 'url' | 'phone'
  enum?: unknown[]
}

interface ObjectSchema {
  properties?: Record<string, PropertySchema>
  required?: string[]
}

/**
 * Validator manual, BUKAN pakai Ajv — sengaja, supaya tidak butuh `new Function`/
 * `eval` sama sekali (Ajv compile schema jadi kode JS lalu eksekusi via
 * `new Function`, yang diblokir CSP `script-src` tanpa `unsafe-eval`).
 * Cukup untuk subset schema yang KITA SENDIRI generate di generateJsonSchema.ts
 * — tidak perlu dukung JSON Schema penuh.
 */
export function createValidator(jsonSchema: Record<string, unknown>): Validator {
  const schema = jsonSchema as ObjectSchema
  const properties = schema.properties ?? {}
  const required = new Set(schema.required ?? [])

  return (data: unknown): ValidationResult => {
    const obj = (data ?? {}) as Record<string, unknown>
    const errors: ValidationError[] = []

    for (const key of required) {
      const value = obj[key]
      if (value === undefined || value === null || value === '') {
        errors.push({ path: key, message: 'wajib diisi' })
      }
    }

    for (const [key, propSchema] of Object.entries(properties)) {
      const value = obj[key]
      if (value === undefined || value === null) continue // required sudah dicek terpisah di atas
      errors.push(...validateProperty(key, value, propSchema))
    }

    return { valid: errors.length === 0, errors }
  }
}

function validateProperty(key: string, value: unknown, schema: PropertySchema): ValidationError[] {
  const errors: ValidationError[] = []

  if (schema.type === 'string' && typeof value !== 'string') {
    return [{ path: key, message: 'harus berupa teks' }]
  }
  if (schema.type === 'number' && typeof value !== 'number') {
    return [{ path: key, message: 'harus berupa angka' }]
  }
  if (schema.type === 'boolean' && typeof value !== 'boolean') {
    return [{ path: key, message: 'harus benar/salah' }]
  }

  if (typeof value === 'string') {
    if (schema.minLength !== undefined && value.length < schema.minLength) {
      errors.push({ path: key, message: `minimal ${schema.minLength} karakter` })
    }
    if (schema.maxLength !== undefined && value.length > schema.maxLength) {
      errors.push({ path: key, message: `maksimal ${schema.maxLength} karakter` })
    }
    // RegExp konstruktor BUKAN eval/new Function — aman untuk CSP strict.
    if (schema.pattern) {
      try {
        if (!new RegExp(schema.pattern).test(value)) {
          errors.push({ path: key, message: 'format tidak sesuai' })
        }
      } catch {
        // pattern tidak valid sebagai regex — abaikan diam-diam, jangan crash validasi
      }
    }
    if (schema.format === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      errors.push({ path: key, message: 'format email tidak valid' })
    }
    if (schema.format === 'url') {
      try {
        new URL(value)
      } catch {
        errors.push({ path: key, message: 'format url tidak valid' })
      }
    }
  }

  if (typeof value === 'number') {
    if (schema.min !== undefined && value < schema.min) {
      errors.push({ path: key, message: `minimal ${schema.min}` })
    }
    if (schema.max !== undefined && value > schema.max) {
      errors.push({ path: key, message: `maksimal ${schema.max}` })
    }
  }

  if (schema.enum && !schema.enum.includes(value)) {
    errors.push({ path: key, message: 'pilihan tidak valid' })
  }

  return errors
}