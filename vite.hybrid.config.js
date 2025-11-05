import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/hybrid/mountExportHtmlButton.js'),
      name: 'ExportHtmlMount',
      formats: ['es', 'iife'],
      fileName: (format) => format === 'iife' ? 'export-html-mount.iife.js' : 'export-html-mount.es.js',
    },
    outDir: 'dist/hybrid',
    emptyOutDir: false,
  },
})


