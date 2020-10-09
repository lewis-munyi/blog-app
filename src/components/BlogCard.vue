<template>
	<div class="col-sm-4">
		<div class="card border-secondary mb-3">
			<img
				:src="cover || 'https://via.placeholder.com/1366x720?text=' + title.split(' ')[0]"
				class="card-img-top"
				style="max-height: 15rem"
				alt="post cover photo"
			/>
			<div class="card-body">
				<h4 class="card-title">{{ title }}</h4>
				<small class="pb-2">
					{{ timestamp }} &bull; By
					<a :href="'/user/' + authorID + '/blog'">{{ author }}</a> </small
				><br />
				<p class="card-text">
					{{ brief }}
				</p>

				<div class="d-flex justify-content-between">
					<a href="#" class="btn btn-primary"
						>Read <i class="ml-1 fas fa-chevron-right"></i
					></a>
					<div>
						<a href="#" class="btn btn-sm btn-secondary mr-2"
							><i class="fas fa-edit"></i
						></a>
						<a href="#" class="btn btn-sm btn-danger"><i class=" fas fa-trash"></i></a>
					</div>
				</div>
			</div>
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
		timestamp: String,
		cover: String,
	},
}
</script>

<style scoped>
img {
	height: 200px;
}
</style>
