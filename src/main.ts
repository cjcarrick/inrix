// import './style.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import OpenLayersMap from 'vue3-openlayers'
import 'vue3-openlayers/dist/vue3-openlayers.css'

createApp(App).use(router).use(OpenLayersMap).mount('#app')
