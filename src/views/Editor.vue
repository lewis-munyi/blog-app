<template>
	<div class="container mt-3">
		<div class="row justify-content-between">
			<h1>New post</h1>
			<div class="align-items-center d-none d-md-block">
				<h6>Split Editor</h6>
				<label class="switch">
					<input type="checkbox" v-model="splitScreen" />
					<span class="slider round"></span>
				</label>
			</div>
		</div>
		<div class="row">
			<!-- Post form -->
			<div :class="{ 'col-md-6': splitScreen, 'col-md-12': splitScreen == false }">
				<form @submit.prevent>
					<fieldset>
						<legend>Post details</legend>
						<div class="form-group">
							<label for="title">Title*</label>
							<input v-model.lazy="post.title" type="text" class="form-control" id="title" placeholder="Enter post title" />
						</div>
						<div class="form-group">
							<label for="description">Description</label>
							<input
								v-model.lazy="post.description"
								type="text"
								class="form-control"
								id="description"
								aria-describedby="description"
								placeholder="Enter description"
							/>
						</div>
						<div class="form-group">
							<label for="cover">Cover</label>
							<input v-model.lazy="post.cover" type="text" class="form-control" id="cover" placeholder="Enter image URL" />
						</div>
						<div class="form-group">
							<label for="content">Post*</label>
							<textarea
								v-model="post.content"
								:rows="height"
								style=""
								type="text"
								class="form-control"
								id="content"
								placeholder="Markdown supported."
							></textarea>
						</div>
						<small class="form-text text-secondary">All fields marked with * are compulsory</small>
						<div class="form-group d-flex justify-content-center m-2">
							<router-link :to="{ name: 'Preview', params: { postString: postString } }" class="btn btn-primary">
								Preview <i class="fas fa-chevron-right"></i
							></router-link>
						</div>
					</fieldset>
				</form>
			</div>
			<!-- Post preview -->
			<div :class="{ 'col-md-6': splitScreen, 'd-none': splitScreen == false }">
				<form>
					<fieldset>
						<legend>Preview</legend>
						<VueMarkdownIt class="card rounded p-2" :source="post.content" :html="true" />
					</fieldset>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	import VueMarkdownIt from 'vue3-markdown-it'
	export default {
		name: 'Editor',
		components: {
			VueMarkdownIt,
		},
		data() {
			return {
				splitScreen: false,
				editorHeight: null,
				post: {
					title: '',
					description: '',
					cover: '',
					content: '',
				},
			}
		},
		computed: {
			height() {
				return (window.innerHeight / 14) * 0.6
			},
			postString() {
				return JSON.stringify(this.post)
			},
		},
		watch: {
			post: {
				deep: true,
				handler() {
					localStorage.setItem('draft', JSON.stringify(this.post))
				},
			},
		},
		mounted() {
			if (localStorage.getItem('draft') != null) {
				this.post = JSON.parse(localStorage.getItem('draft'))
			}
		},
	}
</script>

<style scoped>
	/* The switch - the box around the slider */
	.switch {
		position: relative;
		display: inline-block;
		width: 60px;
		height: 34px;
	}

	/* Hide default HTML checkbox */
	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	/* The slider */
	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #ccc;
		-webkit-transition: 0.4s;
		transition: 0.4s;
	}

	.slider:before {
		position: absolute;
		content: '';
		height: 26px;
		width: 26px;
		left: 4px;
		bottom: 4px;
		background-color: white;
		-webkit-transition: 0.4s;
		transition: 0.4s;
	}

	input:checked + .slider {
		background-color: #222;
	}

	input:focus + .slider {
		box-shadow: 0 0 1px #222;
	}

	input:checked + .slider:before {
		-webkit-transform: translateX(26px);
		-ms-transform: translateX(26px);
		transform: translateX(26px);
	}

	/* Rounded sliders */
	.slider.round {
		border-radius: 34px;
	}

	.slider.round:before {
		border-radius: 50%;
	}
</style>
