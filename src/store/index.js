import { createStore } from 'vuex'
// Todo: Understand Vuex 4.0 store
export default createStore({
	state: {
		user: null,
		token: null,
	},
	mutations: {
		setUser(user) {
			this.state.user = user
		},
		setToken(token) {
			this.state.token = token
		},
	},
	actions: {},
	modules: {},
})
