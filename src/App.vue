<template>
	<NavBar></NavBar>
	<!-- <notifications group="auth" /> -->
	<router-view />
</template>

<script>
	import NavBar from '@/components/NavBar.vue'
	export default {
		name: 'App',
		components: {
			NavBar,
		},
		created() {
			// Check if user is still/already authenticated
			if (localStorage.auth_token) {
				this.$axios
					.get('user/verify')
					.then(res => {
						if (res.status !== 200) {
							// Unauthenticated
							localStorage.clear()
						}
					})
					.catch(err => {
						if (err.response.status == 401) {
							this.$toast('Session expired.', {
								styles: this.$style.danger,
								slotLeft: '<i class="fas fa-user-clock"></i>',
							})
							localStorage.clear()
						}
						console.error(err.message)
					})
			}
		},
	}
</script>

<style lang="scss">
	@import url('assets/css/bootstrap.css');
	html {
		scroll-behavior: smooth;
	}
	body {
		background-color: #e5e5f7;
		background-image: radial-gradient(rgba(68, 76, 247, 0.4) 1px, transparent 1px),
			radial-gradient(rgba(68, 76, 247, 0.4) 1px, rgba(229, 229, 247, 0.4) 1px);
		background-size: 52px 52px;
		background-position: 0 0, 26px 26px;
	}
	.btn-ripple {
		display: inline-block;
		position: relative;
		overflow: hidden;
		transition: all ease-in-out 0.5s;
	}
</style>
