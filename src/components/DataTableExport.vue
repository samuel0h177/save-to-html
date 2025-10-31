<script setup>
import { ref } from 'vue'

const tableWrapperRef = ref(null)

const headers = [
  { title: 'Name', key: 'name' },
  { title: 'Title', key: 'title' },
  { title: 'Email', key: 'email' },
  { title: 'Status', key: 'status' },
]

const items = [
  { name: 'Alice Johnson', title: 'Product Manager', email: 'alice@example.com', status: 'Active' },
  { name: 'Bob Smith', title: 'Software Engineer', email: 'bob@example.com', status: 'Active' },
  { name: 'Carol Chen', title: 'Designer', email: 'carol@example.com', status: 'Inactive' },
  { name: 'Diego Ruiz', title: 'QA Analyst', email: 'diego@example.com', status: 'Active' },
  { name: 'Eve Summers', title: 'DevRel', email: 'eve@example.com', status: 'On leave' },
  { name: 'Frank Li', title: 'Security Engineer', email: 'frank@example.com', status: 'Active' },
  { name: 'Grace Hopper', title: 'Scientist', email: 'grace@example.com', status: 'Inactive' },
]

function getSanitizedExportHtml() {
  const wrapperEl = tableWrapperRef.value
  if (!wrapperEl) return ''

  const clone = wrapperEl.cloneNode(true)

  const selectorsToRemove = [
    'tfoot',
    '.v-data-table-footer',
    '.v-data-table__bottom',
    '.v-data-table__footer',
    '.v-data-table-footer__pagination',
    '.v-pagination',
    '[role="navigation"]',
    '.v-data-table__progress',
  ]
  selectorsToRemove.forEach((sel) => {
    clone.querySelectorAll(sel).forEach((el) => el.remove())
  })

  return clone.outerHTML
}

function saveAsHtml() {
  const contentHtml = getSanitizedExportHtml()
  if (!contentHtml) return

  const docTitle = document.title || 'Table Export'
  const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${docTitle}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@7.4.47/css/materialdesignicons.min.css" rel="stylesheet">
    <style>
      :root { --border-color:#e0e0e0; --header-bg:#f7f7f8; --text-color:#1f1f1f; }
      * { box-sizing: border-box; }
      html, body { height: 100%; }
      body { margin:24px; font-family: Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, 'Noto Sans', 'Liberation Sans', sans-serif; color:var(--text-color); background:#fff; }
      .export-shell { max-width: 1200px; margin: 0 auto; }
      .v-card { border:1px solid var(--border-color); border-radius:10px; overflow:hidden; }
      .v-table table { width:100%; border-collapse: collapse; }
      .v-table thead th { text-align:left; background: var(--header-bg); font-weight:600; border-bottom:1px solid var(--border-color); padding:12px 16px; white-space: nowrap; }
      .v-table tbody td { padding:12px 16px; border-bottom:1px solid var(--border-color); }
      .v-table tbody tr:hover { background:#fafafa; }
      .v-container { max-width:100%; padding:0; }
    </style>
  </head>
  <body>
    <div class="export-shell v-application v-theme--light">
      ${contentHtml}
    </div>
  </body>
</html>`

  const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  const ts = new Date().toISOString().replace(/[:.]/g, '-')
  a.href = url
  a.download = `v-data-table-${ts}.html`
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <v-container class="pa-6" fluid>
    <v-row class="mb-4" align="center" justify="space-between">
      <v-col cols="12" sm="6">
        <h2 class="text-h5">Mock Data Table</h2>
        <div class="text-body-2 text-medium-emphasis">Current view can be saved as a standalone HTML file.</div>
      </v-col>
      <v-col cols="12" sm="6" class="d-flex justify-end align-center">
        <v-btn color="primary" prepend-icon="mdi-content-save" @click="saveAsHtml">
          Save as HTML
        </v-btn>
      </v-col>
    </v-row>

    <div ref="tableWrapperRef">
      <v-card variant="outlined" class="rounded-lg">
        <v-data-table
          :headers="headers"
          :items="items"
          class="elevation-1"
          items-per-page="5"
          hide-default-footer
          density="comfortable"
          hover
        />
      </v-card>
    </div>
  </v-container>
</template>


