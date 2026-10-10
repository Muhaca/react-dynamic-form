import { useCallback, useState } from 'react';
import type { FieldConfig, FieldType } from '../core';
import { useBuilderFieldRegistry } from './BuilderFieldRegistryContext';
import { generateUniqueName } from './generateUniqueName';
import { findFieldByName, updateFieldRecursive, removeFieldRecursive, addFieldToContainer, duplicateFieldRecursive, collectAllNames, moveField as moveFieldTree, type MoveFieldTarget } from './fieldTree';

export interface UseFormBuilderOptions {
    initialFields?: FieldConfig[];
}

export interface UseFormBuilderResult {
    fields: FieldConfig[];
    selectedFieldName: string | null;
    selectedField: FieldConfig | null;
    addField: (type: FieldType) => void;
    removeField: (name: string) => void;
    duplicateField: (name: string) => void;
    updateField: (name: string, updated: FieldConfig) => void;
    reorderFields: (fromIndex: number, toIndex: number) => void;
    moveField: (name: string, target: MoveFieldTarget) => void;
    selectField: (name: string | null) => void;
}

export function useFormBuilder({
    initialFields = [],
}: UseFormBuilderOptions = {}): UseFormBuilderResult {
    const registry = useBuilderFieldRegistry();
    const [fields, setFields] = useState<FieldConfig[]>(initialFields);
    const [selectedFieldName, setSelectedFieldName] = useState<string | null>(null);

    const addField = useCallback(
        (type: FieldType) => {
            const definition = registry[type];
            if (!definition) {
                console.warn(`[dynamic-form-builder] Tidak ada registry untuk field type "${type}"`);
                return;
            }

            setFields((prev) => {
                const base = definition.createDefault();
                const name = generateUniqueName(type, collectAllNames(prev));
                const newField: FieldConfig = { ...base, name };

                const target = selectedFieldName ? findFieldByName(prev, selectedFieldName) : null;
                if (target && target.type === 'container') {
                    return addFieldToContainer(prev, target.name, newField);
                }
                return [...prev, newField];
            });
        },
        [registry, selectedFieldName]
    );

    const removeField = useCallback((name: string) => {
        setFields((prev) => removeFieldRecursive(prev, name));
        setSelectedFieldName((current) => (current === name ? null : current));
    }, []);

    const duplicateField = useCallback((name: string) => {
        setFields((prev) => duplicateFieldRecursive(prev, name, collectAllNames(prev)));
    }, []);

    const updateField = useCallback((name: string, updated: FieldConfig) => {
        setFields((prev) => updateFieldRecursive(prev, name, () => updated));
    }, []);

    const reorderFields = useCallback((fromIndex: number, toIndex: number) => {
        setFields((prev) => {
            const next = [...prev];
            const [moved] = next.splice(fromIndex, 1);
            next.splice(toIndex, 0, moved);
            return next;
        });
    }, []);

    const moveField = useCallback((name: string, target: MoveFieldTarget) => {
        setFields((prev) => moveFieldTree(prev, name, target));
    }, []);

    const selectField = useCallback((name: string | null) => {
        setSelectedFieldName(name);
    }, []);

    const selectedField = selectedFieldName ? findFieldByName(fields, selectedFieldName) : null;

    return {
        fields,
        selectedFieldName,
        selectedField,
        addField,
        removeField,
        duplicateField,
        updateField,
        reorderFields,
        moveField,
        selectField,
    };
}