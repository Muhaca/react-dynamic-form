export function generateUniqueName(baseType: string, existingNames: Set<string>): string {
    let counter = 1;
    let candidate = `${baseType}_${counter}`;

    while (existingNames.has(candidate)) {
        counter += 1;
        candidate = `${baseType}_${counter}`;
    }

    return candidate;
}