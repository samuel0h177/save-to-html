## Save to HTML – Vue/Vuetify data table export

Export any on-screen DOM (e.g., Vuetify `v-data-table`) to a standalone `.html` file that includes minimal, readable styling and a timestamp.

### Quick start (app demo)
```bash
npm install
npm run dev
```
Open the printed URL and try the mock table with the “Save as HTML” button.

### Core component
- `src/components/ExportHtmlButton.vue`: reusable button that exports a target element.
- `src/components/DataTableExport.vue`: example with a Vuetify `v-data-table`.

Use it inside any Vue component:
```vue
<script setup>
import { ref } from 'vue'
import ExportHtmlButton from '@/components/ExportHtmlButton.vue'
const targetRef = ref(null)
</script>

<template>
  <div ref="targetRef">
    <!-- your table or any content to export -->
  </div>
  <ExportHtmlButton :target-ref="targetRef" filename="report" title="My Report" />
</template>
```

Props (selected)
- `targetRef` (required): element or ref to export
- `filename`: base filename (timestamp appended)
- `title`: exported document title
- `selectorsToRemove`: DOM selectors stripped (footer/pagination by default)
- `extraCss`: optional extra CSS for the exported page

### Hybrid builds
There are two ways to use the exporter outside a Vue SPA.

#### 1) Vue + Vuetify mount (ESM/IIFE)
Build:
```bash
npm run build:hybrid
```
Outputs to `dist/hybrid/`:
- `export-html-mount.es.js` (ESM)
- `export-html-mount.iife.js` (IIFE, global `ExportHtmlMount`)

Usage (ESM):
```html
<script type="module">
  import { mountExportHtmlButton } from '/dist/hybrid/export-html-mount.es.js'
  mountExportHtmlButton({
    mount: '#export-btn',
    target: '#table-wrap',
    props: { filename: 'report', title: 'My Report' }
  })
</script>
```

Usage (IIFE):
```html
<script src="/dist/hybrid/export-html-mount.iife.js"></script>
<script>
  ExportHtmlMount.mountExportHtmlButton({
    mount: '#export-btn',
    target: '#table-wrap',
    props: { filename: 'report', title: 'My Report' }
  })
</script>
```

#### 2) Inline minimal build (no Vue/Vuetify)
Build:
```bash
npm run build:hybrid:inline
```
Outputs to `dist/hybrid/`:
- `export-html-inline.es.js` (ESM)
- `export-html-inline.iife.js` (IIFE, global `ExportHtmlInline`)

Usage (IIFE):
```html
<script src="/dist/hybrid/export-html-inline.iife.js"></script>
<script>
  ExportHtmlInline.mountExportHtmlButtonInline({
    mount: '#export-btn',
    target: '#table-wrap',
    filename: 'report',
    title: 'My Report',
    label: 'Save as HTML (Inline)'
  })
</script>
```

### Example page
- `public/hybrid-inline-demo.html` demonstrates the inline build with a small leaderboard table. After building inline, open:
  - Dev server: `http://localhost:5173/hybrid-inline-demo.html`
  - Or serve `public/` + `dist/` and open `/hybrid-inline-demo.html`.

### Notes
- Export captures the current on-screen state (sort/filter) at click time.
- Sort icons are hidden in the export; a timestamp is added below the table.
