import { createContext, useContext, type ComponentType, type ReactNode } from 'react';
import type { FieldConfig, FieldType } from '../core';

export interface FieldRendererProps {
  field: FieldConfig;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  /** HANYA terisi kalau field.type === 'container' — berisi hasil render anak-anaknya. */
  children?: ReactNode;
}

export type FieldRenderer = ComponentType<FieldRendererProps>;

export type FieldRegistry = Partial<Record<FieldType, FieldRenderer>>;

const FieldRegistryContext = createContext<FieldRegistry | null>(null);

export function FieldRegistryProvider({
  registry,
  children,
}: {
  registry: FieldRegistry;
  children: ReactNode;
}) {
  return (
    <FieldRegistryContext.Provider value={registry}>
      {children}
    </FieldRegistryContext.Provider>
  );
}

export function useFieldRegistry(): FieldRegistry {
  const ctx = useContext(FieldRegistryContext);
  if (!ctx) {
    throw new Error(
      'useFieldRegistry: FieldRegistryProvider tidak ditemukan. Bungkus DynamicForm dengan <FieldRegistryProvider registry={...}>.'
    );
  }
  return ctx;
}