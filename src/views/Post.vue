<template>
	<div>
		<header
			class="header"
			id="header"
			:style="post && post.cover ? 'background: url(\'' + post.cover + '\') no-repeat; background-size: cover;' : ''"
		>
			<Loader v-if="isLoading" width="50px" />
			<div class="center" v-else>
				<div class="caption">
					<h2 class="title display-3">
						{{ post.title }}
					</h2>
					<p class="text" v-if="error !== null">{{ error.status }} | {{ error.message }}</p>
					<p class="text">By {{ post.author }}</p>
					<button @click="share(post.title, post.brief, post._id)" class="btn btn-sm btn-primary">
						Share <i class="fas fa-share"></i>
					</button>
				</div>
			</div>
		</header>
		<section class="blog" id="blog">
			<div class="container">
				<div class="row" v-if="!isLoading && post == null">
					<div class="col-sm-12">
						Post not found
					</div>
				</div>
				<div v-if="post" class="card" v-html="post.content"></div>
			</div>
		</section>
	</div>
</template>

<script>
	import Loader from '@/components/Loader.vue'

	export default {
		name: 'Post',
		components: {
			Loader,
		},
		data() {
			return {
				isEmpty: true,
				isLoading: true,
				post: null,
				user: null,
				error: null,
			}
		},
		methods: {
			fetchPost() {
				this.$axios
					.get('/posts/' + this.$route.params.id)
					.then(data => {
						if (data.status == 404) {
							this.$toast(`Post not found :(`, {
								styles: this.$style.info,
								slot: `<i class="fas fa-search"></i>`,
							})
							return this.isEmpty == false
						}
						this.isLoading = false
						this.post = data.data
					})
					.catch(e => {
						this.isLoading = false
						this.$toast(`Error! ${e.message}`, {
							styles: this.$style.danger,
							slot: `<i class="fas fa-exclamation-triangle"></i>`,
						})
						this.error = { status: e.response.status, message: e.message }
						console.error(e.message)
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
			this.isLoading = true
			this.fetchPost()
		},
	}
</script>
<style lang="scss" scoped>
	@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');

	.header {
		position: relative;
		width: 100%;
		height: 45vh;

		.center {
			position: absolute;
			top: 50%;
			left: 50%;
			width: 90%;
			transform: translate(-50%, -50%);
			z-index: 5;
			padding: 1rem;
		}

		.scroll {
			position: absolute;
			top: 95%;
			left: 50%;
			transform: translate(-50%, -50%);
			color: #fff;
			font-size: 1.5rem;
		}
	}
	/*=== Large devices (desktops, 992px and up) ===*/
	@media (min-width: 992px) {
		.header {
			.center {
				width: 50%;
			}

			.left {
				position: absolute;
				top: 20%;
				left: 10%;
				width: 40%;
				height: 60%;
				transform: translate(0, 0);
				padding: 1rem;
			}

			.right {
				position: absolute;
				top: 20%;
				left: 50%;
				width: 40%;
				height: 60%;
				transform: translate(0, 0);
				padding: 1rem;
			}
		}
	}
	#header {
		background: rgba(4, 6, 19, 0.4);
		// background: linear-gradient(to bottom, rgba(203, 53, 107, 0.6), /* #cb356b */ rgba(189, 63, 50, 0.5) /* #bd3f32 */),
		transition: all 0.7s ease-in;
		z-index: 0;
		.caption {
			text-align: center;
			color: #fff;

			.title {
				margin-bottom: 1.5rem;
			}
			.text {
				margin-bottom: 1.5rem;
			}
			.action {
				margin-bottom: 1rem;
				padding-left: 3rem;
				padding-right: 3rem;
				// border-radius: 15px;
			}
		}
	}

	.blog {
		padding: 50px;

		.container {
			.row {
				.col-sm-4 {
					padding-top: 20px;
					padding-bottom: 20px;
				}
			}
		}
		.card-title {
			margin-bottom: 0.25rem;
		}
	}

	.card {
		background-color: #fff;
		border-radius: 5px;
		margin: 10% auto;
		height: auto;
		position: absolute;
		width: 75vw;
		padding: 34px;
		color: #444;
		cursor: pointer;
		font-family: 'Inter', sans-serif;
		font-size: 20px;
		line-height: 36px;
		color: #111111;
		top: 30vh;
		left: 12.5vw;
	}
	@media (max-width: 500px) {
		.header {
			height: 35vh;
		}

		#header {
			.caption {
				.title {
					margin-bottom: 0.75rem;
				}
				.text {
					margin-bottom: 0.75rem;
				}
				.action {
					margin-bottom: 1rem;
					padding-left: 3rem;
					padding-right: 3rem;
					width: 30vw;
				}
			}
		}
		.card {
			width: 96vw;
			padding: 5%;
			font-size: 16px;
			top: 33vh;
			left: 2vw;
		}
	}
</style>
