import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Never ship source maps to production — they expose original source code to anyone
    // who opens DevTools on the deployed site.
    sourcemap: false,
  },
});
