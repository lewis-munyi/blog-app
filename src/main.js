import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

window.$ = window.jQuery = require('jquery')
require('bootstrap/dist/js/bootstrap.bundle')

createApp(App)
	.use(store)
	.use(router)
	.mount('#app')
