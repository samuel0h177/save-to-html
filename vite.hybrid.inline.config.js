import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/hybrid/mountExportHtmlButtonInline.js'),
      name: 'ExportHtmlInline',
      formats: ['es', 'iife'],
      fileName: (format) => format === 'iife' ? 'export-html-inline.iife.js' : 'export-html-inline.es.js',
    },
    outDir: 'dist/hybrid',
    emptyOutDir: false,
    rollupOptions: {
      output: {
        // Ensure no CSS chunks are emitted
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'ignore.css'
          }
          return assetInfo.name || 'asset-[hash][extname]'
        },
      },
    },
  },
})


