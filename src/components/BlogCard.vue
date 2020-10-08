<template>
	<div class="card border-success mb-3" style="max-width: 20rem;">
		<div class="card-header">Header</div>
		<div class="card-body">
			<h4 class="card-title">Success card title</h4>
			<p class="card-text">
				Some quick example text to build on the card title and make up the bulk of the
				card's content.
			</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'BlogCard',
	props: {
		title: String,
		brief: String,
		author: String,
		postID: String,
		authorID: String,
		tiemstamp: String,
	},
}
</script>

<style></style>
