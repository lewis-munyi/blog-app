<template>
	<div>
		<!-- header -->
		<header class="header" id="header">
			<div class="center">
				<div class="caption">
					<h2 class="title display-3">Header title</h2>
					<p class="text">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum ea accusamus
						enim hic, itaque eius quibusdam maxime veritatis maiores, ipsum porro
						bseatae. Quisquam deleniti maxime velit tempora, molestias corrupti iusto!
					</p>
					<button class="action btn btn-primary">click me</button>
					<button class="action btn btn-Light">click me</button>
				</div>
			</div>
			<!-- scroll-down -->
			<i class="scroll fas fa-angle-double-down"></i>
		</header>
		<section class="blog">
			<div class="container">
				<div class="row">
					<BlogCard
						v-for="post in posts"
						:key="post._id"
						:title="post.title"
						:brief="post.brief"
						:author="author"
						:postID="post._id"
						:authorID="post.author_id"
						:timestamp="post.updatedAt"
						:cover='post.cover'
					/>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import BlogCard from '@/components/BlogCard.vue'
export default {
	name: 'Blog',
	components: {
		BlogCard,
	},
	data() {
		return {
			isEmpty: true,
			posts: null,
		}
	},
	mounted() {
		console.log(this.$route.params.id)
		// if (!this.$route.params.id) return
		this.$axios
			.get('/posts/all/' + this.$route.params.id)
			.then(data => {
				if (data.status == 404) {
					return this.isEmpty == false
				}
				this.posts = data.data
				console.log(this.posts)
			})
			.catch(e => {
				console.error(e.message)
			})
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
	background: #355c7d;
	background:
    /* gradient overlay */ linear-gradient(
			to bottom,
			rgba(203, 53, 107, 0.6),
			/* #cb356b */ rgba(189, 63, 50, 0.5) /* #bd3f32 */
		),
		/* bottom image */ url('https://cdn.stocksnap.io/img-thumbs/960w/VPYPAS4FVT.jpg') no-repeat
			left top;
	background-size: cover;
	z-index: 0;
}
#header .caption {
	text-align: center;
	color: #fff;
}
#header .caption .title {
	margin-bottom: 1.5rem;
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
