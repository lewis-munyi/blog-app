<template>
	<div class="col-sm-12 col-md-6 col-lg-4">
		<div class="card border-secondary mb-3 blog-card">
			<img
				:src="cover || 'https://via.placeholder.com/800x600/E5E5F7/4C5656?text=' + title.split(' ')[0]"
				class="card-img-top"
				style="max-height: 15rem"
				:alt="title"
			/>
			<div class="card-body" @click="$router.push({ name: 'Post', params: { id: postID } })">
				<h4 class="card-title mb-1">{{ title }}</h4>
				<small>
					By <router-link :to="{ name: 'Blog', params: { authorID } }">{{ author }}</router-link> </small
				><br />
				<p class="card-text mt-2" v-html="brief + '...'"></p>
			</div>
			<div class="card-footer text-muted">
				<div class="d-flex justify-content-between">
					<span class="my-auto"> {{ createdAt == updatedAt ? `Published: ${createdStr}` : `Updated: ${updatedStr}` }}</span>
					<div>
						<div class="btn-group dropup">
							<button
								type="button"
								class="btn btn-light rounded-circle"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
								title="More"
							>
								<i class="fas fa-ellipsis-v"></i>
							</button>
							<div class="dropdown-menu dropdown-menu-lg-left dropdown-menu-md-left dropdown-menu-sm-left ">
								<a class="dropdown-item" @click="share(title, brief, postID)"><i class="fas fa-share-alt mr-2"></i>Share</a>
								<a v-if="isAuthor" class="dropdown-item"><i class="fas fa-edit mr-2"></i>Edit</a>
								<div v-show="isAuthor" class="dropdown-divider"></div>
								<a
									v-if="isAuthor"
									@click="deletePost(postID)"
									class="dropdown-item text-danger"
									data-toggle="tooltip"
									data-placement="left"
									title="Delete Post Forever"
									><i class="fas fa-trash mr-2"></i>Delete
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
		computed: {
			updatedStr() {
				let i = toDate(parseISO(this.updatedAt))
					.toString()
					.split(' ')
				return `${i[2]}-${i[1]}-${i[3]}`
			},
			createdStr() {
				let i = toDate(parseISO(this.createdAt))
					.toString()
					.split(' ')
				return `${i[2]}-${i[1]}-${i[3]}`
			},
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

<style lang="scss" scoped>
	img {
		height: 200px;
	}
	.blog-card {
		--bg-color: #fdfdfe;
		--bg-color-light: #f1f7ff;
		--text-color-hover: #4c5656;
		--box-shadow-color: rgba(220, 233, 255, 0.48);
		--hover-card: #f1f7ff;
	}

	.card {
		box-shadow: 0 14px 26px rgba(0, 0, 0, 0.04);
		transition: all 0.3s ease-out;
		max-height: 500px;

		.card-body {
			overflow: hidden;

			&:hover {
				background: var(--hover-card);
			}
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
	}
</style>
