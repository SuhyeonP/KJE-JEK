import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
  ],
  resolve: {
    alias: {
      hook: path.resolve(__dirname, 'src/hook'),
      pages: path.resolve(__dirname, 'src/pages'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
});
