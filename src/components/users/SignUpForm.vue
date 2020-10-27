<template>
	<div class="container">
		<form>
			<div class=" row form-group">
				<div class="col col-sm-12 col-md-4">
					<label for="firstname">First Name</label>
				</div>
				<div class="col col-sm-12 col-md-8">
					<input
						type="text"
						class="form-control"
						id="firstname"
						aria-describedby="firstnameHelp"
						placeholder="Enter First name"
						v-model.lazy="form.firstname"
					/>
				</div>
			</div>
			<div class=" row form-group">
				<div class="col col-sm-12 col-md-4">
					<label for="lastname">Last Name</label>
				</div>
				<div class="col col-sm-12 col-md-8">
					<input
						type="lastname"
						class="form-control"
						id="lastname"
						aria-describedby="lastnameHelp"
						placeholder="Enter Last name"
						v-model.lazy="form.lastname"
					/>
				</div>
			</div>
			<div class=" row form-group">
				<div class="col col-sm-12 col-md-4">
					<label for="email">Email address</label>
				</div>
				<div class="col col-sm-12 col-md-8">
					<input
						type="email"
						class="form-control"
						id="email"
						aria-describedby="emailHelp"
						placeholder="Enter email"
						v-model.trim="form.email"
					/>
					<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
				</div>
			</div>
			<div class="row form-group">
				<div class="col col-sm-12 col-md-4">
					<label for="password">Password</label>
				</div>
				<div class="col col-sm-12 col-md-8">
					<input type="password" class="form-control" id="password" placeholder="Password" v-model.trim="form.password" />
				</div>
			</div>
			<div class="row form-group">
				<div class="col col-sm-12 col-md-4">
					<label for="repeatPassword">Repeat Password</label>
				</div>
				<div class="col col-sm-12 col-md-8">
					<input
						type="password"
						class="form-control"
						id="repeatPassword"
						placeholder="Re-enter Password"
						v-model.trim="form.repeatPassword"
					/>
				</div>
			</div>
			<div class=" row form-group">
				<div class="col col-sm-12 col-md-4">
					<label for="social">Social Media</label>
				</div>
				<div class="col col-sm-12 col-md-8">
					<input
						type="text"
						class="form-control"
						id="social"
						aria-describedby="socialHelp"
						placeholder="Enter a valid link to your social media account"
						v-model.lazy="form.social"
					/>
					<small id="socialHelp" class="form-text text-muted">This is not a required field</small>
				</div>
			</div>
			<div class=" row form-group">
				<div class="col col-sm-12 col-md-4">
					<label for="photo">Photo URL</label>
				</div>
				<div class="col col-sm-12 col-md-8">
					<input
						type="text"
						class="form-control"
						id="photo"
						aria-describedby="photoHelp"
						placeholder="Enter a valid link to your profile photo"
						v-model.lazy="form.photo"
					/>
					<small id="photoHelp" class="form-text text-muted">This is not a required field</small>
				</div>
			</div>
			<div class=" row form-group">
				<div class="col col-sm-12 col-md-4">
					<label for="banner">Banner URL</label>
				</div>
				<div class="col col-sm-12 col-md-8">
					<input
						type="text"
						class="form-control"
						id="banner"
						aria-describedby="bannerHelp"
						placeholder="Enter a valid link to your banner photo"
						v-model.lazy="form.banner"
					/>
					<small id="bannerHelp" class="form-text text-muted">Image will be displayed as your profile background</small>
				</div>
			</div>
			<div class="row">
				<div class="col-md-8 d-flex justify-content-center offset-md-3">
					<a v-on:click="signup" @submit.prevent class="btn btn-ripple btn-primary mt-3">
						Proceed
					</a>
				</div>
			</div>
		</form>
	</div>
</template>

<script>
	export default {
		name: 'SignInForm',
		data() {
			return {
				form: {
					firstname: null,
					lastname: null,
					email: null,
					password: null,
					repeatPassword: null,
					photo: null,
					banner: null,
				},
			}
		},
		methods: {
			signup() {
				let { email, password, repeatPassword, photo } = this.form

				// Make sure all fields are filled
				if (Object.values(this.form).some(o => o === null)) {
					return this.$toast(`Fill in all the fields!`, {
						styles: this.$style.danger,
						slot: `<i class="fas fa-exclamation-triangle"></i>`,
					})
					// return console.log('Fill in all fields')
				} else if (password !== repeatPassword) {
					return this.$toast(`Passwords do not merge`, {
						styles: this.$style.danger,
						slot: `<i class="fas fa-exclamation-triangle"></i>`,
					})
				}
				// Ensure correct URL format
				else if (
					!/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.test(
						photo
					)
				) {
					return this.$toast(`Enter correct URL format!`, {
						styles: this.$style.danger,
						slot: `<i class="fas fa-exclamation-triangle"></i>`,
					})
					// console.error('Enter correct photo URL')
				}
				// Ensure correct email format
				else if (!/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
					return this.$toast(`Enter correct email format!`, {
						styles: this.$style.danger,
						slot: `<i class="fas fa-exclamation-triangle"></i>`,
					})
					// console.log('Enter correct email format')
				} else {
					this.$axios
						.post('user/signup', this.form)
						.then(() => {
							// Signup successful
							// console.log(res.status)
							// alert('Signup successful! Log in to continue')
							this.$toast(`Welcome aboard! 😃`, {
								styles: this.$style.danger,
								slot: `<i class="fas fa-exclamation-triangle"></i>`,
							})
							return this.$emit('child-to-parent')
							// return location.reload()
						})
						.catch(err => {
							return this.$toast(`Error! ${err.message}`, {
								styles: this.$style.danger,
								slot: `<i class="fas fa-exclamation-triangle"></i>`,
							})
						})
				}
			},
		},
	}
</script>

<style>
	form {
		width: 100%;
	}
</style>
