import { createApp } from 'vue'
import axios from 'axios'
import DKToast from 'vue-dk-toast'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

// Import bootstrap, Popper and jquery
window.$ = window.jQuery = require('jquery')
require('bootstrap/dist/js/bootstrap.bundle')

// Fix tooltips not showing
window.$('body').tooltip({ selector: '[data-toggle=tooltip]' })

// Set Axios Headers
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.baseURL = 'http://jarida-blog.herokuapp.com/api/v1/'
// axios.defaults.baseURL = 'http://localhost:3000/api/v1/'

//Set Bearer token if token exists
localStorage.auth_token ? (axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.auth_token) : ''

const notificationStyles = {
	danger: {
		color: '#7f3f00',
		backgroundColor: '#fde4cc',
		borderColor: '#fcdab8',
	},
	success: {
		color: '#125d28',
		backgroundColor: '#d3f0db',
		borderColor: '#c1e9cd',
	},
	primary: {
		color: '#7a3634',
		backgroundColor: '#fbe1e0',
		borderColor: '#f9d5d4',
	},
	warning: {
		color: '#7f7813',
		backgroundColor: '#fdfad3',
		borderColor: '#fcf8c2',
	},
	secondary: {
		color: '#585858',
		backgroundColor: '#eeeeee',
		borderColor: '#e7e7e7',
	},
	info: {
		color: '#1b3550',
		backgroundColor: '#d6e0eb',
		borderColor: '#c6d4e2',
	},
	light: {
		color: '#818182',
		backgroundColor: '#fefefe',
		borderColor: '#fdfdfe',
	},
	dark: {
		color: '#fff',
		backgroundColor: '#222',
		borderColor: '#000',
	},
}

// Initialize vue app and make axios available globally
const app = createApp(App)
app.config.globalProperties.$axios = axios
app.config.globalProperties.$style = notificationStyles
app.use(store)
	.use(router)
	.use(DKToast, {
		duration: 5000,
		positionY: 'top', // 'top' or 'bottom'
		positionX: 'right', // 'right' or 'left'
	})
	.mount('#app')