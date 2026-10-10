import { useForm, type UseFormReturn } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import {
  parseSchema,
  createValidator,
  type FormSchema,
  type BackendSchemaResponse,
} from '../core';

export interface UseDynamicFormOptions {
  formId: string;
  /** Fungsi fetch schema dari backend. Sesuaikan dengan API client project kamu. */
  fetchSchema: (formId: string) => Promise<BackendSchemaResponse>;
}

export interface UseDynamicFormResult {
  schema: FormSchema | undefined;
  isLoading: boolean;
  isError: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
}

export function useDynamicForm({
  formId,
  fetchSchema,
}: UseDynamicFormOptions): UseDynamicFormResult {
  const {
    data: schema,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['dynamic-form-schema', formId],
    queryFn: () => fetchSchema(formId).then(parseSchema),
    staleTime: 5 * 60 * 1000,
  });

  const form = useForm({
    // resolver dibuat ulang tiap kali schema berubah (mis. versi baru dari backend)
    resolver: async (values) => {
      if (!schema) {
        return { values, errors: {} };
      }
      const validate = createValidator(schema.jsonSchema);
      const result = validate(values);

      if (result.valid) {
        return { values, errors: {} };
      }

      const errors = result.errors.reduce<Record<string, { type: string; message: string; }>>(
        (acc, err) => {
          acc[err.path] = { type: 'validation', message: err.message };
          return acc;
        },
        {}
      );
      return { values: {}, errors };
    },
  });

  return { schema, isLoading, isError, form };
}
