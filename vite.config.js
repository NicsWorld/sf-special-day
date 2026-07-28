import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.js.org/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Relative base path ensures assets load seamlessly on GitHub Pages
});
