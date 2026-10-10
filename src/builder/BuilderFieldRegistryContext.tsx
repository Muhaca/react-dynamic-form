import { createContext, useContext, type ReactNode } from 'react';
import type { BuilderFieldRegistry } from './types';

const BuilderFieldRegistryContext = createContext<BuilderFieldRegistry | null>(null);

export function BuilderFieldRegistryProvider({
    registry,
    children,
}: {
    registry: BuilderFieldRegistry;
    children: ReactNode;
}) {
    return (
        <BuilderFieldRegistryContext.Provider value={registry} >
            {children}
        </BuilderFieldRegistryContext.Provider>
    );
}

export function useBuilderFieldRegistry(): BuilderFieldRegistry {
    const ctx = useContext(BuilderFieldRegistryContext);
    if (!ctx) {
        throw new Error(
            'useBuilderFieldRegistry: BuilderFieldRegistryProvider tidak ditemukan.'
        );
    }
    return ctx;
}