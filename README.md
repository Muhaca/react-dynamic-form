# react-dynamic-form

Build, render and validate **dynamic forms driven by backend JSON** in React.
One package, three opt-in layers:

- **core** — schema parser, manual JSON-Schema validator (CSP-safe, no `eval`/Ajv), JSON-Schema generator. No React.
- **react** — `useDynamicForm` hook, `<DynamicForm>`, field registry. Built on `react-hook-form` + `@tanstack/react-query`.
- **tailwind** — ready-to-use Tailwind field renderers (21 field types).
- **builder** — drag-and-drop Form Builder (Palette / Canvas / PropertyPanel) built on `@dnd-kit`.

## Features

- Backend only sends `{ formId, version, fields }` — the JSON Schema used for
  validation is generated on the client.
- Conditional fields via `visibleWhen` (`eq`, `neq`, `gt`, `lt`, `in`).
- Nested `container` layout (one level), 12-column grid via `layout.colSpan`.
- Bring your own renderers through a simple registry — no lock-in to Tailwind.
- CSP-friendly: the validator is a plain interpreter, never compiles schema to code.

## Install

```bash
pnpm add react-dynamic-form
# peers
pnpm add react react-dom react-hook-form
# only if you use the tailwind renderers
pnpm add -D tailwindcss
```

`@tanstack/react-query` and `@dnd-kit/*` are installed automatically as
dependencies of this package.

## Quick start

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DynamicForm, FieldRegistryProvider, type BackendSchemaResponse } from 'react-dynamic-form';
import { tailwindFieldRegistry } from 'react-dynamic-form/tailwind';

const queryClient = new QueryClient();

async function fetchSchema(formId: string): Promise<BackendSchemaResponse> {
  const res = await fetch(`/api/forms/${formId}/schema`);
  return res.json();
}

export function OrderFormPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <FieldRegistryProvider registry={tailwindFieldRegistry}>
        <DynamicForm
          formId="order-form-v2"
          fetchSchema={fetchSchema}
          onSubmit={(data) => console.log(data)}
        />
      </FieldRegistryProvider>
    </QueryClientProvider>
  );
}
```

> `QueryClientProvider` is required because `useDynamicForm` uses
> `@tanstack/react-query` to fetch and cache the schema.

## Entry points

| Import | Contents |
| --- | --- |
| `react-dynamic-form` | core + react (`DynamicForm`, `FieldRegistryProvider`, `useDynamicForm`, parser/validator/generator, types) |
| `react-dynamic-form/core` | parser, validator, JSON-Schema generator, constants, types (no React) |
| `react-dynamic-form/tailwind` | `tailwindFieldRegistry` + individual renderers |
| `react-dynamic-form/builder` | `FormBuilder`, `useFormBuilder`, `Palette`, `Canvas`, `PropertyPanel`, `fieldTree`, … |

## Tailwind setup (important)

The `tailwind` and `builder` layers ship className strings inside the built
package. Tailwind cannot see them unless you add the package's `dist` to your
`content` globs, otherwise every field renders **without styling** (silently):

```js
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/react-dynamic-form/dist/**/*.{js,mjs}',
  ],
};
```

If you use only `react-dynamic-form` + a custom registry and never import
`react-dynamic-form/tailwind` or `/builder`, you can skip this.

## Custom renderers

Any project with its own design system can drop the Tailwind layer completely:

```tsx
import { DynamicForm, FieldRegistryProvider, type FieldRegistry } from 'react-dynamic-form';

const customRegistry: FieldRegistry = {
  text: MyTextInput,
  select: MySelect,
  date: MyDatePicker,
  checkbox: MyCheckbox,
};

<FieldRegistryProvider registry={customRegistry}>
  <DynamicForm formId="order-form-v2" fetchSchema={fetchSchema} onSubmit={handleSubmit} />
</FieldRegistryProvider>;
```

A renderer receives `{ field, control, children? }` and uses
`react-hook-form`'s `<Controller>` internally. See
`src/tailwind/renderers/` for reference implementations.

## Form builder

```tsx
import { FormBuilder, type FieldConfig } from 'react-dynamic-form/builder';

<FormBuilder
  initialFields={existingFields}
  onSave={(fields: FieldConfig[]) => save(fields)}
  onCancel={() => close()}
/>;
```

The builder works on a recursive field tree — fields can be nested inside a
`container`, and every operation (`find`, `update`, `remove`, `addToContainer`)
handles nesting. Drag-reorder inside a container, undo/redo and meta-schema
validation are not implemented yet.

## Schema contract

Backend sends:

```ts
interface BackendSchemaResponse {
  formId: string;
  version: string;
  fields: FieldConfig[];
  gridColumns?: number; // send 12 for the modern grid; absent/<12 = legacy 4-col
}
```

Each field carries its own validation rules under the nested `validation`
object (`minLength`, `maxLength`, `min`, `max`, `pattern`, `format`); `required`
stays at the root. `type: 'container'` holds `children: FieldConfig[]` but is a
layout construct, not data.

### Supported field types

Data: `text`, `textarea`, `number`, `select`, `date`, `checkbox`, `email`,
`phone`, `time`, `radio`, `multiselect`, `yesno`, `file`, `rating`, `currency`,
`address`, `table`.

Display-only (never validated or submitted): `container`, `heading`, `divider`,
`chart`.

## Local development

```bash
pnpm install
pnpm build

# terminal 1 — mock backend (http://localhost:4000)
pnpm dev:mock

# terminal 2 — playground (http://localhost:5173)
pnpm dev:playground
```

The playground imports this package's **source** via Vite aliases, so changes in
`src/` are reflected instantly.

## License

MIT
