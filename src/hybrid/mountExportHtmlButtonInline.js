// Minimal, framework-free mount for hybrid apps. No Vue/Vuetify required.
// Renders a plain button and exports target element's current DOM into styled HTML.

function resolveEl(elOrSelector) {
  if (!elOrSelector) return null
  return typeof elOrSelector === 'string' ? document.querySelector(elOrSelector) : elOrSelector
}

function sanitizeOuterHtml(rootEl, selectorsToRemove) {
  if (!rootEl) return ''
  const clone = rootEl.cloneNode(true)
  selectorsToRemove.forEach((sel) => {
    clone.querySelectorAll(sel).forEach((n) => n.remove())
  })
  return clone.outerHTML
}

export function mountExportHtmlButtonInline({
  mount,
  target,
  label = 'Save as HTML',
  filename = 'export',
  title = 'HTML Export',
  selectorsToRemove = [
    'tfoot',
    '.v-data-table-footer',
    '.v-data-table__bottom',
    '.v-data-table__footer',
    '.v-data-table-footer__pagination',
    '.v-pagination',
    '[role="navigation"]',
    '.v-data-table__progress',
  ],
  extraCss = '',
  buttonClass = '',
  buttonStyle = '',
} = {}) {
  const mountEl = resolveEl(mount)
  const targetEl = resolveEl(target)
  if (!mountEl) throw new Error('mount element not found')
  if (!targetEl) throw new Error('target element not found')

  const btn = document.createElement('button')
  btn.type = 'button'
  btn.textContent = label
  btn.className = buttonClass
  btn.style.cssText = buttonStyle || 'padding:8px 12px;border:1px solid #d0d0d0;border-radius:8px;background:#1867c0;color:#fff;font:500 14px/1.2 Roboto, Arial, sans-serif;cursor:pointer;'
  btn.addEventListener('mouseenter', () => { btn.style.filter = 'brightness(0.95)' })
  btn.addEventListener('mouseleave', () => { btn.style.filter = '' })

  function save() {
    const contentHtml = sanitizeOuterHtml(targetEl, selectorsToRemove)
    if (!contentHtml) return
    const tsDisplay = new Date().toLocaleString()
    const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
    <style>
      :root { --border-color:#e0e0e0; --header-bg:#f7f7f8; --text-color:#1f1f1f; }
      * { box-sizing: border-box; }
      html, body { height: 100%; }
      body { margin:24px; font-family: Roboto, Arial, sans-serif; color:var(--text-color); background:#fff; }
      .export-shell { max-width: 1200px; margin: 0 auto; }
      .v-card { border:1px solid var(--border-color); border-radius:10px; overflow:hidden; }
      .v-table table { width:100%; border-collapse: collapse; }
      .v-table thead th { text-align:left; background: var(--header-bg); font-weight:600; border-bottom:1px solid var(--border-color); padding:12px 16px; white-space: nowrap; }
      .v-table tbody td { padding:12px 16px; border-bottom:1px solid var(--border-color); }
      .v-table tbody tr:hover { background:#fafafa; }
      .v-table thead th .v-icon { display: none !important; }
      .v-container { max-width:100%; padding:0; }
      .export-footer { margin-top:12px; color:#6b6b6b; font-size:12px; text-align:right; }
      ${extraCss}
    </style>
  </head>
  <body>
    <div class="export-shell v-application v-theme--light">
      ${contentHtml}
      <div class="export-footer">Exported: ${tsDisplay}</div>
    </div>
  </body>
</html>`

    const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    const ts = new Date().toISOString().replace(/[:.]/g, '-')
    a.href = url
    a.download = `${filename}-${ts}.html`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  btn.addEventListener('click', save)
  mountEl.appendChild(btn)

  return {
    el: btn,
    destroy() {
      btn.removeEventListener('click', save)
      if (btn.parentNode) btn.parentNode.removeChild(btn)
    },
  }
}


