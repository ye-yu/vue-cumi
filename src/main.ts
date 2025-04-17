import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { useActivePalette } from './composables/use-active-palette'

useActivePalette().init()
createApp(App).mount('#app')
