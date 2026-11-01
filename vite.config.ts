import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative assets allow deployment both at a custom domain and under /<repo>/ on Pages.
export default defineConfig({ plugins: [react()], base: './' });
