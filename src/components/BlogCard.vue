<template>
	<div class="col-sm-12 col-md-6 col-lg-4">
		<div class="card border-secondary mb-3 blog-card">
			<img
				:src="cover || 'https://via.placeholder.com/1366x720/F9D5D4/4C5656?text=' + title.split(' ')[0]"
				class="card-img-top"
				style="max-height: 15rem"
				alt="post cover photo"
			/>
			<div class="card-body">
				<h4 class="card-title mb-1">{{ title }}</h4>
				<small>
					By <router-link :to="{ name: 'Blog', params: { authorID } }">{{ author }}</router-link> </small
				><br />
				<p class="card-text mt-2">
					{{ brief + '...' }}
				</p>
			</div>
			<div class="card-footer text-muted">
				<div class="d-flex justify-content-between">
					<span class="my-auto"> {{ createdAt == updatedAt ? formatDates().created : 'Updated: ' + formatDates().updated }}</span>
					<!-- <a href="#" class="btn btn-ripple btn-primary">Read <i class="ml-1 fas fa-chevron-right"></i></a> -->
					<div>
						<!-- Split dropup button -->
						<div class="btn-group dropup">
							<a
								class="btn btn-ripple btn-primary"
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
								class="btn btn-secondary dropdown-toggle dropdown-toggle-split"
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

<style lang="scss" scoped>
	img {
		height: 200px;
	}
	.blog-card {
		--bg-color: #fdfdfe;
		--bg-color-light: #f1f7ff;
		--text-color-hover: #4c5656;
		--box-shadow-color: rgba(220, 233, 255, 0.48);
	}

	.card {
		box-shadow: 0 14px 26px rgba(0, 0, 0, 0.04);
		transition: all 0.3s ease-out;

		max-height: 500px;
		.card-body {
						overflow: hidden;
					}
		&:hover {
			transform: translateY(-5px) translateX(-5px) scale(1.005) translateZ(0);
			box-shadow: 0 24px 36px rgba(0, 0, 0, 0.11), 0 24px 46px var(--box-shadow-color);
			border-color: var(--bg-color-light);
			background: var(--bg-color);
		}
	}

	.card:active {
		transform: scale(1) translateZ(0);
		box-shadow: 0 15px 24px rgba(0, 0, 0, 0.11), 0 15px 24px var(--box-shadow-color);
	}

	.card p {
		font-size: 17px;
		color: #4c5656;
	// 	margin-top: 30px;
	// 	z-index: 1000;
	// 	transition: color 0.3s ease-out;
	}

</style>
