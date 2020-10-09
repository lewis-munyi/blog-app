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
					{{ timestamp }} &bull; By <router-link :to="{ name: 'Blog', params: { authorID } }">{{ author }}</router-link> </small
				><br />
				<p class="card-text">
					{{ brief }}
				</p>

				<div class="d-flex justify-content-between">
					<a href="#" class="btn btn-ripple btn-primary">Read <i class="ml-1 fas fa-chevron-right"></i></a>
					<div>
						<a class="btn btn-ripple btn-sm btn-info rounded-circle" @click="share(title, brief, postID)"><i class="fas fa-share"></i></a>
						<a v-if="isAuthor" href="#" class="btn btn-ripple btn-sm btn-secondary mr-2"><i class="fas fa-edit"></i></a>
						<a v-if="isAuthor" @click="deletePost(postID)" class="btn btn-ripple btn-sm btn-danger"><i class=" fas fa-trash"></i></a>
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
		data() {
			return {
				isAuthor: false,
			}
		},
		methods: {
			deletePost(id) {
				// console.log("deleting " + id);
				this.$axios.delete('/posts/' + id).then(res => {
					console.log(res.data.message)
					this.$emit('update-posts')
				})
			},
			share(title, text, id) {
				if (navigator.share) {
					navigator
						.share({
							title,
							text,
							url: 'http://localhost:3000/post/' + id,
						})
						.then(() => {})
						.catch(error => console.log('Error sharing', error))
				}
			},
		},
		mounted() {
			if (localStorage.user) {
				if (JSON.parse(localStorage.getItem('user'))?._id == this.authorID) {
					this.isAuthor = true
				}
			}
		},
	}
</script>

<style scoped>
	img {
		height: 200px;
	}
</style>
