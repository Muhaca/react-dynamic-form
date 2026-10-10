import type { PropertyEditorProps } from '../types';
import { FieldGroup, WidthPicker } from '../ui';

const RATING_SCALES = [3, 5, 7, 10] as const;

export function RatingPropertyEditor({ field, onChange }: PropertyEditorProps) {
    return (
        <FieldGroup label="Skala bintang">
            <WidthPicker
                value={field.maxRating ?? 5}
                options={RATING_SCALES}
                formatLabel={(n) => `${n}★`}
                onChange={(maxRating) => onChange({ ...field, maxRating })}
            />
        </FieldGroup>
    );
}