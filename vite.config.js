import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Port'u ortam değişkeninden al; verilmemişse Vite kendi varsayılanını (5173) kullansın.
    port: process.env.PORT ? Number(process.env.PORT) : undefined,
  },
})
