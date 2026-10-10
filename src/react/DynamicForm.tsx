import { forwardRef, useImperativeHandle, useRef, type ReactNode } from 'react';
import type { BackendSchemaResponse } from '../core';
import { useDynamicForm } from './useDynamicForm';
import { FieldList } from './FieldList';

export interface DynamicFormProps {
  formId: string;
  fetchSchema: (formId: string) => Promise<BackendSchemaResponse>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: any) => void;
  loadingFallback?: ReactNode;
  errorFallback?: ReactNode;
  /** Sembunyikan tombol submit bawaan — dipakai kalau consumer app mau
   * pegang sendiri tombolnya (mis. tombol di luar iframe) dan trigger
   * submit lewat ref.current.submit(). */
  hideSubmitButton?: boolean;
}

export interface DynamicFormHandle {
  /** Trigger submit form secara terprogram dari luar (mis. dari command
   * postMessage yang dikirim consumer app). Perilakunya identik dengan
   * user klik tombol submit — tetap lewat validasi RHF/Ajv seperti biasa. */
  submit: () => void;
}

export const DynamicForm = forwardRef<DynamicFormHandle, DynamicFormProps>(function DynamicForm(
  {
    formId,
    fetchSchema,
    onSubmit,
    loadingFallback = <div>Loading form...</div>,
    errorFallback = <div>Gagal memuat form.</div>,
    hideSubmitButton = false,
  },
  ref
) {
  const { schema, isLoading, isError, form } = useDynamicForm({ formId, fetchSchema });
  const watchedValues = form.watch();
  const formElementRef = useRef<HTMLFormElement>(null);

  useImperativeHandle(ref, () => ({
    submit: () => {
      // requestSubmit() memicu event submit native, yang sudah terpasang ke
      // form.handleSubmit(onSubmit) di bawah — jadi tetap lewat validasi RHF,
      // bukan bypass langsung ke onSubmit.
      formElementRef.current?.requestSubmit();
    },
  }));

  if (isLoading) return <>{loadingFallback}</>;
  if (isError || !schema) return <>{errorFallback}</>;

  return (
    <form ref={formElementRef} onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <FieldList fields={schema.fields} control={form.control} watchedValues={watchedValues} />
      {!hideSubmitButton && <button type="submit">Submit</button>}
    </form>
  );
});