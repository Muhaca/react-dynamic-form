import { useState } from 'react';
import { DynamicForm, type BackendSchemaResponse } from '@adiproject.dev/react-dynamic-form';
import { FormBuilder } from '@adiproject.dev/react-dynamic-form/builder';

async function fetchSchema(formId: string): Promise<BackendSchemaResponse> {
  const res = await fetch(`/api/forms/${formId}`);
  if (!res.ok) throw new Error(`Gagal memuat form "${formId}" (${res.status})`);
  return res.json();
}

type Tab = 'render' | 'builder';

export function App() {
  const [tab, setTab] = useState<Tab>('render');
  const [submitted, setSubmitted] = useState<unknown>(null);
  const [savedFields, setSavedFields] = useState<unknown>(null);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b border-gray-200 bg-white px-6 py-4">
        <h1 className="text-lg font-semibold">react-dynamic-form playground</h1>
        <nav className="mt-3 flex gap-2">
          {(['render', 'builder'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium ${
                tab === t
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t === 'render' ? 'Renderer' : 'Form Builder'}
            </button>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-8">
        {tab === 'render' && (
          <section className="rounded-lg border border-gray-200 bg-white p-6">
            <DynamicForm
              formId="playground-form"
              fetchSchema={fetchSchema}
              onSubmit={(data) => setSubmitted(data)}
            />
            {submitted !== null && (
              <pre className="mt-6 overflow-auto rounded-md bg-gray-900 p-4 text-xs text-green-300">
                {JSON.stringify(submitted, null, 2)}
              </pre>
            )}
          </section>
        )}

        {tab === 'builder' && (
          <section className="space-y-4">
            <div className="h-[640px] overflow-hidden rounded-lg border border-gray-200 bg-white">
              <FormBuilder
                onSave={(fields) => setSavedFields(fields)}
                onCancel={() => setSavedFields(null)}
              />
            </div>
            {savedFields !== null && (
              <pre className="overflow-auto rounded-md bg-gray-900 p-4 text-xs text-green-300">
                {JSON.stringify(savedFields, null, 2)}
              </pre>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
