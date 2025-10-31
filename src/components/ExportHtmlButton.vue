<script setup>

const props = defineProps({
  // Accept either a DOM element or a ref to one (template refs are auto-unwrapped to the element)
  // Use `type: null` to avoid Vue's type check complaining when it's temporarily null before mount
  targetRef: { type: null, required: true },
  filename: { type: String, default: 'export' },
  title: { type: String, default: 'Table Export' },
  selectorsToRemove: {
    type: Array,
    default: () => [
      'tfoot',
      '.v-data-table-footer',
      '.v-data-table__bottom',
      '.v-data-table__footer',
      '.v-data-table-footer__pagination',
      '.v-pagination',
      '[role="navigation"]',
      '.v-data-table__progress',
    ],
  },
  prependIcon: { type: String, default: 'mdi-content-save' },
  color: { type: String, default: 'primary' },
  variant: { type: String, default: 'elevated' },
  density: { type: String, default: 'default' },
  extraCss: { type: String, default: '' },
})

function getTargetEl() {
  const candidate = props.targetRef
  if (!candidate) return null
  // If a ref object was passed from script, use .value; otherwise candidate is the element
  const el = (candidate && typeof candidate === 'object' && 'value' in candidate) ? candidate.value : candidate
  return el || null
}

function computeSanitizedOuterHtml() {
  const el = getTargetEl()
  if (!el) return ''
  const clone = el.cloneNode(true)
  props.selectorsToRemove.forEach((sel) => {
    clone.querySelectorAll(sel).forEach((n) => n.remove())
  })
  return clone.outerHTML
}

function save() {
  const contentHtml = computeSanitizedOuterHtml()
  if (!contentHtml) return

  const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${props.title}</title>
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
      /* Hide sort arrow icons in header */
      .v-table thead th .v-icon { display: none !important; }
      .v-container { max-width:100%; padding:0; }
      ${props.extraCss}
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
  a.download = `${props.filename}-${ts}.html`
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <v-btn :color="color" :variant="variant" :density="density" :prepend-icon="prependIcon" @click="save">
    <slot>Save as HTML</slot>
  </v-btn>
  
</template>


