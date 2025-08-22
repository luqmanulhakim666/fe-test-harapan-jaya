import { createVuetify } from 'vuetify'
import 'vuetify/styles' // Import Vuetify styles
import '@mdi/font/css/materialdesignicons.css' // Import MDI icons
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
  components,
  directives
  // Optional: Configure themes, icons, etc.
  // theme: { defaultTheme: 'light' },
})
