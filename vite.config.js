import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // optimizeDeps: {
  //   // Ensure that Vite correctly handles ES module imports from node_modules
  //   include: ["@heroicons/react"]
  // }
});
