<template>
	<div class="card mt-3 mb-3">
		<div class="row no-gutters">
			<div
				class="col-sm-4"
				:style="
					cover
						? 'background: url(\'' + cover + '\') no-repeat; background-size: cover;'
						: 'background: url(\'https://via.placeholder.com/800x600/E5E5F7/4C5656?text=' +
						  title.split(' ')[0] +
						  '\') no-repeat; background-size: cover;'
				"
			>
				<!-- <img
					v-if="!cover"
					:src="'https://via.placeholder.com/800x600/E5E5F7/4C5656?text=' + title.split(' ')[0]"
					class="card-img-top h-100"
					:alt="title"
				/> -->
			</div>
			<div class="col-sm-8">
				<div class="card-body">
					<h5 class="card-title">{{ title }}</h5>
					<p class="card-text" v-html="brief + '...'"></p>
					<router-link class="btn btn-primary" :to="{ name: 'Post', params: { id } }"
						>Read <i class="fas fa-chevron-right"></i
					></router-link>
				</div>
				<div class="card-footer">
					<div class="justify-content-between">
						<div>
							<small class="text-muted">
								{{ createdAt == updatedAt ? `Published on ${createdStr}` : `Last updated on ${updatedStr}` }} by
							</small>
							<router-link :to="{ name: 'Blog', params: { id: authorID } }"
								><small>{{ author }}</small></router-link
							>
						</div>
					</div>
					<!-- Clap -->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { parseISO, toDate } from 'date-fns'

	export default {
		name: 'HomeCard',
		props: {
			id: String,
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
				sort: 'time',
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
		width: 100%;

		.card-body {
			overflow: hidden;

			&:hover {
				background: white;
				transition: all 0.1s ease-in-out;
			}
		}
		&:hover {
			transform: translateY(-5px) translateX(-5px) scale(1.005) translateZ(0);
			box-shadow: 0 24px 36px rgba(0, 0, 0, 0.11), 0 24px 46px var(--box-shadow-color);
			border-color: var(--bg-color-light);
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
