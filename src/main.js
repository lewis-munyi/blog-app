import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
// import Notifications from 'vue-notification'
import './registerServiceWorker'

// Import bootstrap, Popper and jquery
window.$ = window.jQuery = require('jquery')
require('bootstrap/dist/js/bootstrap.bundle')

// Fix tooltips not showing
window.$('body').tooltip({ selector: '[data-toggle=tooltip]' })

// Set Axios Headers
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.baseURL = 'http://localhost:3000/'

//Set Bearer token if token exists
localStorage.auth_token ? (axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.auth_token) : ''

// Initialize vue app and make axios available globally
const app = createApp(App)
app.config.globalProperties.$axios = axios
app.use(store)
	.use(router)
	// .use(Notifications)
	.mount('#app')

// Check if user is still/already authenticated
if (localStorage.auth_token) {
	axios
		.get('user/verify')
		.then(res => {
			if (res.status !== 200) {
				localStorage.auth_token = null
				localStorage.user = null
			} else {
				// Authenticated
				// console.log(res.data.message)
			}
		})
		.catch(() => {
			// console.log(err)
			localStorage.auth_token = null
			localStorage.user = null
		})
}
