# Contributing

Thanks for taking the time to contribute.

## Setup

```bash
pnpm install
pnpm build
```

## Useful commands

| Command | Description |
| --- | --- |
| `pnpm build` | Build all entry points with tsup (ESM + CJS + d.ts). |
| `pnpm typecheck` | `tsc --noEmit`. |
| `pnpm dev:mock` | Start the in-memory mock API on port 4000. |
| `pnpm dev:playground` | Start the Vite playground on port 5173. |

## Project layout

```
src/core/      parser, validator, JSON-Schema generator (no React)
src/react/     hook + <DynamicForm> + registry context
src/tailwind/  Tailwind field renderers
src/builder/   drag-and-drop Form Builder
playground/    Vite demo app (imports src via alias)
mock-api/      tiny node:http mock backend
```

## Adding a field type

1. Extend the `FieldType` union in `src/core/types.ts`.
2. Map its primitive JSON-Schema type in `src/core/generateJsonSchema.ts` if needed.
3. Add a renderer in `src/tailwind/renderers/` and register it in
   `src/tailwind/registry.ts`.
4. (Optional) add a `paletteLabel`/`paletteIcon`/`PropertyEditor` entry in
   `src/builder/registry/index.ts`.

## Pull requests

- Keep the public API and generated `dist` types stable unless it is an
  intentional breaking change (use a changeset).
- Run `pnpm typecheck` and `pnpm build` before opening a PR.
- Add a changeset with `pnpm changeset` for any user-facing change.
