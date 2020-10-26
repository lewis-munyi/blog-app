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
	}
</script>

<style lang="scss">
	@import url('assets/css/bootstrap.min.css');
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
