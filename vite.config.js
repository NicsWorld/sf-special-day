import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.js.org/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensures relative assets loading on GitHub Pages
});
