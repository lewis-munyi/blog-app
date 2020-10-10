<template>
	<h1>Welcome to a single post</h1>
</template>

<script>
	export default {
		name: 'Post',
		props: {
			title: String,
			author: String,
			postID: String,
			authorID: String,
			createdAt: String,
			updatedAt: String,
			cover: String,
		},
	}
</script>

<style></style>
