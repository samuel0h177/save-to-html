import { createApp, h } from 'vue'
import vuetify from '../plugins/vuetify'
import ExportHtmlButton from '../components/ExportHtmlButton.vue'

export function mountExportHtmlButton({ mount, target, props = {} } = {}) {
  const mountEl = typeof mount === 'string' ? document.querySelector(mount) : mount
  const targetEl = typeof target === 'string' ? document.querySelector(target) : target
  if (!mountEl) throw new Error('mount element not found')
  if (!targetEl) throw new Error('target element not found')

  const app = createApp({
    render() {
      return h(ExportHtmlButton, { ...props, targetRef: targetEl })
    },
  })
  app.use(vuetify)
  app.mount(mountEl)

  return {
    app,
    unmount() { app.unmount() },
  }
}


