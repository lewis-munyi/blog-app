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
						{{ post.title || 'No title' }}
					</h2>
					<p class="text">{{ post.description || 'No description provided' }}</p>
					<button @click="publish" class="btn btn-secondary rounded">Publish <i class="fas fa-save"></i></button>
				</div>
			</div>
		</header>
		<section class="blog" id="blog">
			<div class="container">
				<div class="row" v-if="post == null">
					<div class="col-sm-12">
						No content provided
					</div>
				</div>
				<VueMarkdownIt
					v-if="post"
					class="card rounded p-2"
					:plugins="plugins"
					:source="post.content"
					:breaks="true"
					:html="true"
					:linkify="true"
					:typographer="true"
				/>
			</div>
		</section>
	</div>
</template>

<script>
	import Loader from '@/components/Loader.vue'
	import VueMarkdownIt from 'vue3-markdown-it'
	import MarkdownItStrikethroughAlt from 'markdown-it-strikethrough-alt'
	import MarkdownItAbbr from 'markdown-it-abbr'
	import MarkdownItDeflist from 'markdown-it-deflist'
	import MarkdownItEmoji from 'markdown-it-emoji'
	import MarkdownItTaskLists from 'markdown-it-task-lists'
	import MarkdownItTocDoneRight from 'markdown-it-toc-done-right'

	export default {
		name: 'Post',
		components: {
			Loader,
			VueMarkdownIt,
		},
		props: {
			postString: String,
		},
		computed: {
			post() {
				return JSON.parse(this.postString)
			},
		},
		data() {
			return {
				plugins: [
					{
						plugin: MarkdownItTaskLists,
					},
					{
						plugin: MarkdownItTocDoneRight,
					},
					{
						plugin: MarkdownItStrikethroughAlt,
					},
					{
						plugin: MarkdownItAbbr,
					},
					{
						plugin: MarkdownItDeflist,
					},
					{
						plugin: MarkdownItEmoji,
					},
					{
						plugin: MarkdownItEmoji,
					},
				],
			}
		},
		methods: {
			publish() {
				if (!this.post.title || !this.post.content) {
					return this.$toast('Provide a title and body', {
						styles: this.$style.danger,
						slot: `<i class="fas fa-exclamation-triangle"></i>`,
					})
				}

				if (
					!this.post.cover ||
					!/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.test(
						this.post.cover
					)
				) {
					return this.$toast('Enter correct URL format', {
						styles: this.$style.danger,
						slot: `<i class="fas fa-exclamation-triangle"></i>`,
					})
				}

				this.$axios
					.post('posts/new', this.post)
					.then(res => {
						this.$toast('Published!', {
							styles: this.$style.success,
							slot: `<i class="fas fa-circle-check"></i>`,
						})
						localStorage.removeItem('draft')
						this.$router.push({ name: 'Post', params: { id: res.data._id } })
					})
					.catch(error => {
						this.$toast(error.message, {
							styles: this.$style.danger,
							slot: `<i class="fas fa-exclamation-triangle"></i>`,
						})
					})
			},
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
				color: white;
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
