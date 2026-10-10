import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  entry: {
    index: 'src/index.ts',
    'core/index': 'src/core/index.ts',
    'tailwind/index': 'src/tailwind/index.ts',
    'builder/index': 'src/builder/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: !options.watch,
  treeshake: true,
  external: [
    'react',
    'react-dom',
    'react-hook-form',
    '@tanstack/react-query',
    '@dnd-kit/core',
    '@dnd-kit/sortable',
    '@dnd-kit/utilities',
  ],
}));
