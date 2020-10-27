<template>
	<div>
		<!-- header -->
		<header
			class="header"
			id="header"
			:style="user && user.banner ? 'background: url(\'' + user.banner + '\') no-repeat; background-size: cover;' : ''"
		>
			<div class="center">
				<div class="caption">
					<h2 v-if="isLoading == false" class="title display-3">
						{{ user ? user.name.split(' ')[0] + "'s blog" : '' }}
					</h2>
					<p class="text" v-if="error !== null">{{ error.status }} | {{ error.message }}</p>
					<Loader v-if="isLoading" width="50px" />
					<p class="text" v-else-if="user">
						{{ user.social ? 'Feel reach out to them from the link below' : '' }}
					</p>
					<a v-if="user?.social" :href="user.social || '#'" target="_blank" class="action btn btn-primary">Contact</a>
				</div>
			</div>
			<!-- scroll-down -->
			<a href="#blog"><i class="scroll fas fa-angle-double-down" href="#blog"></i></a>
		</header>
		<section class="blog" id="blog">
			<div class="container">
				<div class="row">
					<div class="col-sm-12" v-if="!isLoading && posts && posts.length == 0">
						No posts found for this user
					</div>
					<BlogCard
						v-else
						v-on:update-posts="fetchPosts"
						v-for="post in posts"
						:key="post._id"
						:title="post.title"
						:brief="post.brief"
						:author="post.author"
						:postID="post._id"
						:authorID="post.author_id"
						:updatedAt="post.updatedAt"
						:createdAt="post.createdAt"
						:cover="post.cover"
					/>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
	import BlogCard from '@/components/BlogCard.vue'
	import Loader from '@/components/Loader.vue'

	export default {
		name: 'Blog',
		components: {
			BlogCard,
			Loader,
		},
		data() {
			return {
				isEmpty: true,
				isLoading: true,
				posts: null,
				user: null,
				error: null,
			}
		},
		methods: {
			fetchPosts() {
				this.$axios
					.get('/posts/all/' + this.$route.params.id)
					.then(data => {
						if (data.status == 404) {
							return this.isEmpty == false
						}
						this.isLoading = false
						this.posts = data.data.posts
						this.user = data.data.user
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
		},
		created() {
			this.fetchPosts()
		},
	}
</script>
<style lang="scss" scoped>
	.header {
		position: relative;
		width: 100%;
		height: 500px;
	}
	.header .center {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 90%;
		transform: translate(-50%, -50%);
		z-index: 5;
		padding: 1rem;
	}
	.header .left {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 90%;
		transform: translate(-50%, -50%);
		z-index: 5;
		padding: 1rem;
	}
	.header .right {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 90%;
		transform: translate(-50%, -50%);
		z-index: 5;
		padding: 1rem;
	}
	.header .scroll {
		position: absolute;
		top: 95%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: #fff;
		font-size: 1.5rem;
	}
	/*=== Large devices (desktops, 992px and up) ===*/
	@media (min-width: 992px) {
		.header .center {
			width: 50%;
		}
		.header .left {
			position: absolute;
			top: 20%;
			left: 10%;
			width: 40%;
			height: 60%;
			transform: translate(0, 0);
			padding: 1rem;
		}
		.header .right {
			position: absolute;
			top: 20%;
			left: 50%;
			width: 40%;
			height: 60%;
			transform: translate(0, 0);
			padding: 1rem;
		}
	}
	#header {
		background: rgba(4, 6, 19, 0.4);
		// background: linear-gradient(to bottom, rgba(203, 53, 107, 0.6), /* #cb356b */ rgba(189, 63, 50, 0.5) /* #bd3f32 */),
		transition: all 0.7s ease-in;
		z-index: 0;
	}
	#header .caption {
		text-align: center;
		color: #fff;
	}
	#header .caption .title {
		margin-bottom: 1.5rem;
		color: white;
	}
	#header .caption .text {
		margin-bottom: 1.5rem;
	}
	#header .caption .action {
		margin-bottom: 1rem;
		padding-left: 3rem;
		padding-right: 3rem;
		border-radius: 15px;
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
</style>
