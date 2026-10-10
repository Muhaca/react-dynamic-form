import type { PropertyEditorProps } from '../types';
import { FieldGroup, Segmented } from '../ui';

const SIZES = [
    { value: 'h1', label: 'H1' },
    { value: 'h2', label: 'H2' },
    { value: 'h3', label: 'H3' },
    { value: 'caption', label: 'Caption' },
] as const;

export function HeadingPropertyEditor({ field, onChange }: PropertyEditorProps) {
    return (
        <FieldGroup label="Ukuran Judul">
            <Segmented<'h1' | 'h2' | 'h3' | 'caption'>
                value={field.textSize ?? 'h2'}
                options={SIZES}
                onChange={(textSize) => onChange({ ...field, textSize })}
                ariaLabel="Ukuran judul"
            />
        </FieldGroup>
    );
}