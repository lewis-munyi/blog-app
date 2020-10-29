<template>
	<nav class="navbar navbar-expand-lg navbar-light bg-light">
		<div class="container-fluid">
			<router-link class="navbar-brand font-family-bold" to="/">Blog</router-link>
			<button
				class="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbar"
				aria-controls="navbar"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse" id="navbar">
				<ul class="navbar-nav mr-auto align-left"></ul>
				<ul class="navbar-nav mr-2 align-right">
					<li class="nav-item d-flex align-items-center">
						<a class="nav-link" :class="{ active: user != null }" href="#" @click="newPost">
							New post
							<span class="sr-only"></span>
						</a>
					</li>
					<li class="nav-item active" v-if="user == null">
						<a class="nav-link" href="#" @click="showSignUpModal">
							{{ isSignIn == true ? 'Sign In' : 'Sign Up' }}
							<span class="sr-only"></span>
						</a>
					</li>
					<li class="nav-item dropdown" v-else>
						<a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
							<img id="ppic" :src="user.photo" alt="profile_photo" />
						</a>
						<div class="dropdown-menu dropdown-menu-lg-right">
							<a class="dropdown-item font-weight-bold" href="#"><i class="fas fa-user"></i>{{ user.name }}</a>
							<router-link :to="{ name: 'Blog', params: { id: user._id } }" class="dropdown-item"
								><i class="fas fa-rss"></i>Blog</router-link
							>
							<a class="dropdown-item" href="#"><i class="fas fa-share"></i>Share</a>
							<div class="dropdown-divider"></div>
							<a class="dropdown-item" href="#" @click="logout"> <i class="fas fa-sign-out-alt"></i>Log out </a>
						</div>
					</li>
				</ul>
			</div>
			<!-- Sign in Modal -->
			<div class="modal fade" id="signUpModal" tabindex="-1" aria-labelledby="signUpModalLabel" aria-hidden="true">
				<div class="modal-dialog modal-lg">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="signUpModalLabel">
								{{ isSignIn == true ? 'Sign In' : 'Sign Up' }}
							</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							<SignInForm v-if="isSignIn == true" />
							<SignUpForm v-on:child-to-parent="toggleSignIn" v-else />
						</div>
						<div class="modal-footer align-left">
							<a href="#" @click="toggleSignIn" v-if="isSignIn == true" class="btn btn-ripple btn-sm btn-outline-secondary"
								>or Sign Up</a
							>
							<a href="#" @click="toggleSignIn" v-else class="btn btn-ripple btn-sm btn-outline-secondary">or Sign In</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</nav>
</template>

<script>
	import SignInForm from '@/components/users/SignInForm.vue'
	import SignUpForm from '@/components/users/SignUpForm.vue'

	export default {
		name: 'NavBar',
		components: {
			SignInForm,
			SignUpForm,
		},
		data() {
			return {
				user: null,
				isSignIn: true,
				id: null,
			}
		},
		methods: {
			showSignUpModal() {
				window.$('#signUpModal').modal({
					keyboard: false,
					backdrop: 'static',
				})
				window.$('#signUpModal').modal('show')
			},
			toggleSignIn() {
				this.isSignIn = !this.isSignIn
			},
			newPost() {
				if (this.user) this.$router.push({ name: 'New' })
				else this.showSignUpModal()
			},
			logout() {
				localStorage.setItem('auth_token', null)
				localStorage.setItem('user', null)
				location.reload()
			},
		},
		mounted() {
			if (localStorage.getItem('auth_token')) {
				this.user = JSON.parse(localStorage.user)
			}
		},
		watch: {
			user(newUser) {
				localStorage.user = JSON.stringify(newUser)
			},
		},
	}
</script>

<style lang="scss" scoped>
nav {
	padding: 8px 8px;
}
	// Profile pic dimensions
	#ppic {
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}

	// Add icon padding
	.dropdown-item i {
		padding-right: 6px;
	}
</style>
