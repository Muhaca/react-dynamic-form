import type { FieldConfig } from '../core';
import { generateUniqueName } from './generateUniqueName';

export function findFieldByName(fields: FieldConfig[], name: string): FieldConfig | null {
    for (const field of fields) {
        if (field.name === name) return field;
        if (field.type === 'container' && field.children) {
            const found = findFieldByName(field.children, name);
            if (found) return found;
        }
    }
    return null;
}

export function updateFieldRecursive(
    fields: FieldConfig[],
    name: string,
    updater: (field: FieldConfig) => FieldConfig
): FieldConfig[] {
    return fields.map((field) => {
        if (field.name === name) return updater(field);
        if (field.type === 'container' && field.children) {
            return { ...field, children: updateFieldRecursive(field.children, name, updater) };
        }
        return field;
    });
}

export function removeFieldRecursive(fields: FieldConfig[], name: string): FieldConfig[] {
    return fields
        .filter((field) => field.name !== name)
        .map((field) =>
            field.type === 'container' && field.children
                ? { ...field, children: removeFieldRecursive(field.children, name) }
                : field
        );
}

export function addFieldToContainer(
    fields: FieldConfig[],
    containerName: string,
    newField: FieldConfig
): FieldConfig[] {
    return fields.map((field) => {
        if (field.name === containerName && field.type === 'container') {
            return { ...field, children: [...(field.children ?? []), newField] };
        }
        if (field.type === 'container' && field.children) {
            return { ...field, children: addFieldToContainer(field.children, containerName, newField) };
        }
        return field;
    });
}

export function collectAllNames(fields: FieldConfig[]): Set<string> {
    const names = new Set<string>();
    function walk(list: FieldConfig[]) {
        for (const field of list) {
            names.add(field.name);
            if (field.type === 'container' && field.children) walk(field.children);
        }
    }
    walk(fields);
    return names;
}

function cloneFieldWithNewNames(field: FieldConfig, existing: Set<string>): FieldConfig {
    const clone = JSON.parse(JSON.stringify(field)) as FieldConfig;
    const newName = generateUniqueName(field.type, existing);
    existing.add(newName);
    clone.name = newName;
    if (clone.type === 'container' && clone.children) {
        clone.children = clone.children.map((child) => cloneFieldWithNewNames(child, existing));
    }
    return clone;
}

/**
 * Duplikat satu field (beserta subtree children-nya kalau container) dan sisipkan
 * tepat setelah field asal, di level yang sama (top-level atau di dalam container).
 * `existing` berisi semua nama field saat ini — dipakai untuk regenerate nama
 * unik pada seluruh cabang hasil salinan.
 */
export function duplicateFieldRecursive(
    fields: FieldConfig[],
    name: string,
    existing: Set<string>
): FieldConfig[] {
    const result: FieldConfig[] = [];
    for (const field of fields) {
        result.push(field);
        if (field.name === name) {
            result.push(cloneFieldWithNewNames(field, existing));
        } else if (field.type === 'container' && field.children) {
            const index = result.length - 1;
            result[index] = { ...field, children: duplicateFieldRecursive(field.children, name, existing) };
        }
    }
    return result;
}

/**
 * Lokasi satu field di pohon: index di list yang menampungnya + nama container
 * induknya (null = top-level). Container dibatasi 1 level (schema), jadi cukup
 * cek 1 tingkat. Return null kalau field tidak ketemu.
 */
export function locateField(
    fields: FieldConfig[],
    name: string
): { index: number; containerName: string | null; } | null {
    for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        if (field.name === name) return { index: i, containerName: null };
        if (field.type === 'container' && field.children) {
            const childIndex = field.children.findIndex((c) => c.name === name);
            if (childIndex !== -1) return { index: childIndex, containerName: field.name };
        }
    }
    return null;
}

/** Hapus field dari pohon, kembalikan field yang terhapus + pohon hasil. */
export function removeFieldReturning(
    fields: FieldConfig[],
    name: string
): { fields: FieldConfig[]; removed: FieldConfig | null; } {
    const removed = findFieldByName(fields, name);
    if (!removed) return { fields, removed: null };
    return { fields: removeFieldRecursive(fields, name), removed };
}

function clampIndex(value: number, max: number): number {
    return Math.max(0, Math.min(value, max));
}

/** Sisipkan field ke children sebuah container (index opsional → append akhir). */
export function insertIntoContainer(
    fields: FieldConfig[],
    containerName: string,
    field: FieldConfig,
    index?: number
): FieldConfig[] {
    return fields.map((f) => {
        if (f.name === containerName && f.type === 'container') {
            const children = [...(f.children ?? [])];
            const at = index === undefined ? children.length : clampIndex(index, children.length);
            children.splice(at, 0, field);
            return { ...f, children };
        }
        return f;
    });
}

/** Sisipkan field di top-level (index opsional → append akhir). */
export function insertTopLevel(fields: FieldConfig[], field: FieldConfig, index?: number): FieldConfig[] {
    const next = [...fields];
    const at = index === undefined ? next.length : clampIndex(index, next.length);
    next.splice(at, 0, field);
    return next;
}

export interface MoveFieldTarget {
    /** Nama container tujuan. null = pindah ke top-level. */
    containerName: string | null;
    /** Index di list tujuan (semantik arrayMove/splice). undefined = append akhir. */
    index?: number;
}

/**
 * Pindahkan satu field ke container lain / top-level / posisi lain dalam satu
 * container. Semantik index sama dengan arrayMove: index diukur terhadap list
 * tujuan saat masih utuh. Pindahan container → dalam container DITOLAK (schema
 * membatasi nesting 1 level) → mengembalikan `fields` apa adanya.
 */
export function moveField(fields: FieldConfig[], name: string, target: MoveFieldTarget): FieldConfig[] {
    const removed = findFieldByName(fields, name);
    if (!removed) return fields;

    if (target.containerName) {
        if (removed.type === 'container') return fields;
        const containerField = findFieldByName(fields, target.containerName);
        if (!containerField || containerField.type !== 'container') return fields;
    }

    const withoutSource = removeFieldRecursive(fields, name);

    if (target.containerName) {
        const containerField = findFieldByName(withoutSource, target.containerName) as FieldConfig;
        const children = containerField.children ?? [];
        const at = target.index === undefined ? children.length : clampIndex(target.index, children.length);
        return insertIntoContainer(withoutSource, target.containerName, removed, at);
    }

    const at = target.index === undefined ? withoutSource.length : clampIndex(target.index, withoutSource.length);
    return insertTopLevel(withoutSource, removed, at);
}