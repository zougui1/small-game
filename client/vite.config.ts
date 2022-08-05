import path from 'node:path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const port = 3000;

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port,
  },
  plugins: [react()],
});
