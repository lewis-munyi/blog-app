<template>
	<section>
		<div class="container">
			<div class="row">
				<button @click="toggleSort" class="btn btn-primary">Sort by: {{ sortBy == 'time' ? 'Time' : 'Popularity' }}</button>
			</div>
			<div class="row">
				<Loader v-if="isLoading" width="50px" />
				<div class="col-sm-12" v-if="!isLoading && posts && posts.length == 0">
					No posts found for this user
				</div>
				<HomeCard
					v-else
					v-for="post in posts"
					:key="post._id"
					:id="post._id"
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
</template>

<script>
	import HomeCard from '@/components/HomeCard.vue'
	import Loader from '@/components/Loader.vue'
	export default {
		name: 'Home',
		components: {
			HomeCard,
			Loader,
		},
		data() {
			return {
				isEmpty: true,
				isLoading: true,
				posts: null,
				user: null,
				error: null,
				sortBy: 'time',
			}
		},
		watch: {
			sortBy() {
				this.isLoading = true
				this.fetchPosts(this.sortBy)
			},
		},
		methods: {
			fetchPosts(sortOption) {
				this.$axios
					.get('/posts/all', { params: { sort: sortOption } })
					.then(data => {
						if (data.status == 404) {
							return this.isEmpty == false
						}
						this.isLoading = false
						this.posts = data.data
					})
					.catch(e => {
						this.isLoading = false
						this.error = { status: e.response.status, message: e.message }
						console.error(e.message)
					})
			},
			toggleSort() {
				if (this.sortBy == 'popularity') {
					this.sortBy = 'time'
				} else {
					this.sortBy = 'popularity'
				}
			},
		},
		created() {
			this.fetchPosts('time')
		},
	}
</script>
<style lang="scss" scoped>
	// .header {
	// 	position: relative;
	// 	width: 100%;
	// 	height: 500px;
	// }
	// .header .center {
	// 	position: absolute;
	// 	top: 50%;
	// 	left: 50%;
	// 	width: 90%;
	// 	transform: translate(-50%, -50%);
	// 	z-index: 5;
	// 	padding: 1rem;
	// }
	// .header .left {
	// 	position: absolute;
	// 	top: 50%;
	// 	left: 50%;
	// 	width: 90%;
	// 	transform: translate(-50%, -50%);
	// 	z-index: 5;
	// 	padding: 1rem;
	// }
	// .header .right {
	// 	position: absolute;
	// 	top: 50%;
	// 	left: 50%;
	// 	width: 90%;
	// 	transform: translate(-50%, -50%);
	// 	z-index: 5;
	// 	padding: 1rem;
	// }
	// .header .scroll {
	// 	position: absolute;
	// 	top: 95%;
	// 	left: 50%;
	// 	transform: translate(-50%, -50%);
	// 	color: #fff;
	// 	font-size: 1.5rem;
	// }
	// /*=== Large devices (desktops, 992px and up) ===*/
	// @media (min-width: 992px) {
	// 	.header .center {
	// 		width: 50%;
	// 	}
	// 	.header .left {
	// 		position: absolute;
	// 		top: 20%;
	// 		left: 10%;
	// 		width: 40%;
	// 		height: 60%;
	// 		transform: translate(0, 0);
	// 		padding: 1rem;
	// 	}
	// 	.header .right {
	// 		position: absolute;
	// 		top: 20%;
	// 		left: 50%;
	// 		width: 40%;
	// 		height: 60%;
	// 		transform: translate(0, 0);
	// 		padding: 1rem;
	// 	}
	// }
	// #header {
	// 	background: rgb(68, 76, 247);
	// 	// background: linear-gradient(to bottom, rgba(203, 53, 107, 0.6), /* #cb356b */ rgba(189, 63, 50, 0.5) /* #bd3f32 */),
	// 	transition: all 0.7s ease-in;
	// 	z-index: 0;
	// }
	// #header .caption {
	// 	text-align: center;
	// 	color: #fff;
	// }
	// #header .caption .title {
	// 	margin-bottom: 1.5rem;
	// }
	// #header .caption .text {
	// 	margin-bottom: 1.5rem;
	// }
	// #header .caption .action {
	// 	margin-bottom: 1rem;
	// 	padding-left: 3rem;
	// 	padding-right: 3rem;
	// 	border-radius: 15px;
	// }

	section {
		padding: 50px;
		padding-top: 30px;

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
