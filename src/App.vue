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
</style>
