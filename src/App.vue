<template>
	<NavBar></NavBar>
	<div id="nav">
		<!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/test">Test</router-link> -->
	</div>
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
// @import "~bootstrap/scss/bootstrap";
@import url('assets/css/bootstrap.min.css');
</style>
