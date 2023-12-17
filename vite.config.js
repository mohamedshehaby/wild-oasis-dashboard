import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
  },
});

// process.env.BROWSER = 'firefox';
// process.env.NODE_ENV === 'development';
