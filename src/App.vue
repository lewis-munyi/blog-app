<template>
	<NavBar></NavBar>
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
	.btn-ripple {
		display: inline-block;
		position: relative;
		overflow: hidden;
		transition: all ease-in-out 0.5s;
	}
</style>
