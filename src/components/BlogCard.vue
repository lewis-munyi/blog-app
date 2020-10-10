<template>
	<div class="col-sm-12 col-md-6 col-lg-4">
		<div class="card border-secondary mb-3">
			<img
				:src="cover || 'https://via.placeholder.com/1366x720?text=' + title.split(' ')[0]"
				class="card-img-top"
				style="max-height: 15rem"
				alt="post cover photo"
			/>
			<div class="card-body">
				<h4 class="card-title mb-1">{{ title }}</h4>
				<small>
					By <router-link :to="{ name: 'Blog', params: { authorID } }">{{ author }}</router-link> </small
				><br />
				<p class="card-text pt-2">
					{{ brief + '...' }}
				</p>

				<div class="d-flex justify-content-between">
					<small class="pb-2"> {{ createdAt == updatedAt ? formatDates().created : 'Updated: ' + formatDates().updated }}</small>
					<!-- <a href="#" class="btn btn-ripple btn-primary">Read <i class="ml-1 fas fa-chevron-right"></i></a> -->
					<div>
						<!-- Split dropup button -->
						<div class="btn-group dropup">
							<a
								class="btn btn-sm btn-ripple btn-info"
								v-bind:class="{ 'rounded-circle btn-sm': !isAuthor }"
								@click="share(title, brief, postID)"
								data-toggle="tooltip"
								data-placement="top"
								title="Share post"
								data-original-title="Share post"
								><i class="fas fa-share"></i
							></a>
							<button
								v-if="isAuthor"
								type="button"
								class="btn btn-sm btn-secondary dropdown-toggle dropdown-toggle-split"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							>
								<span class="sr-only">Toggle Dropdown</span>
							</button>
							<div class="dropdown-menu">
								<a class="dropdown-item" href="#"> <i class="fas fa-edit mr-2"></i> Edit post </a>
								<a
									@click="deletePost(postID)"
									class="dropdown-item text-danger"
									href="#"
									data-toggle="tooltip"
									data-placement="left"
									title="Delete Post Forever"
									><i class="fas fa-trash mr-2"></i> Delete
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { parseISO, toDate } from 'date-fns'

	export default {
		name: 'BlogCard',
		props: {
			title: String,
			brief: String,
			author: String,
			postID: String,
			authorID: String,
			createdAt: String,
			updatedAt: String,
			cover: String,
		},
		data() {
			return {
				isAuthor: false,
				created: null,
				updated: null,
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
			formatDates() {
				let i = toDate(parseISO(this.updatedAt))
					.toString()
					.split(' ')
				let x = i[1] + ' ' + i[2] + ', ' + i[3]
				i = toDate(parseISO(this.createdAt))
					.toString()
					.split(' ')
				let y = i[1] + ' ' + i[2] + ', ' + i[3]
				return { created: y, updated: x }
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
