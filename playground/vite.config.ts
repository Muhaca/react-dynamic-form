import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const src = path.resolve(dir, '../src');

export default defineConfig({
  root: dir,
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@adiproject.dev/react-dynamic-form/core', replacement: path.join(src, 'core/index.ts') },
      { find: '@adiproject.dev/react-dynamic-form/tailwind', replacement: path.join(src, 'tailwind/index.ts') },
      { find: '@adiproject.dev/react-dynamic-form/builder', replacement: path.join(src, 'builder/index.ts') },
      { find: '@adiproject.dev/react-dynamic-form', replacement: path.join(src, 'index.ts') },
    ],
  },
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:4000',
    },
  },
});
