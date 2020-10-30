<template>
	<div class="container">
		<form>
			<div class=" row form-group">
				<div class="col-sm-12 col-md-4">
					<label for="firstname">First Name</label>
				</div>
				<div class="col-sm-12 col-md-8">
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
				<div class="col-sm-12 col-md-4">
					<label for="lastname">Last Name</label>
				</div>
				<div class="col-sm-12 col-md-8">
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
				<div class="col-sm-12 col-md-4">
					<label for="email">Email address</label>
				</div>
				<div class="col-sm-12 col-md-8">
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
				<div class="col-sm-12 col-md-4">
					<label for="password">Password</label>
				</div>
				<div class="col-sm-12 col-md-8">
					<input type="password" class="form-control" id="password" placeholder="Password" v-model.trim="form.password" />
				</div>
			</div>
			<div class="row form-group">
				<div class="col-sm-12 col-md-4">
					<label for="repeatPassword">Repeat Password</label>
				</div>
				<div class="col-sm-12 col-md-8">
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
				<div class="col-sm-12 col-md-4">
					<label for="social">Social Media</label>
				</div>
				<div class="col-sm-12 col-md-8">
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
				<div class="col-sm-12 col-md-4">
					<label for="photo">Photo URL</label>
				</div>
				<div class="col-sm-12 col-md-8">
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
				<div class="col-sm-12 col-md-4">
					<label for="banner">Banner URL</label>
				</div>
				<div class="col-sm-12 col-md-8">
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
			<div v-if="notif.message" class="row justify-content-center">
				<div
					class="alert"
					:class="{ 'alert-success': notif.type == 'success', 'alert-danger': notif.type == 'danger', 'alert-info': notif.type == 'info' }"
				>
					<div v-html="notif.icon"></div>
					<strong>{{ notif.message }}</strong>
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
				notif: {
					type: null,
					message: null,
					icon: `<i class="fas fa-info'}`,
				},
			}
		},
		methods: {
			alert(type, message, icon) {
				this.notif.type = type
				this.notif.message = message
				this.notif.icon = `<i class="fas fa-${icon || 'info'}"`
				setTimeout(() => {
					this.notif.message = null
					this.notif.type = null
				}, 5000)
			},
			signup() {
				let { email, password, repeatPassword, photo } = this.form

				// Make sure all fields are filled
				if (Object.values(this.form).some(o => o === null)) {
					return this.alert('danger', `Fill in all the fields`, 'exclamation-triangle')
				} else if (password !== repeatPassword) {
					return this.alert('danger', `Passwords do not match`, 'exclamation-triangle')
				}
				// Ensure correct URL format
				else if (
					!/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.test(
						photo
					)
				) {
					return this.alert('danger', `Enter correct url format`, 'exclamation-triangle')
				}
				// Ensure correct email format
				else if (!/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
					// return this.$toast(`Enter correct email format!`, {
					return this.alert('danger', `Enter correct email format`, 'exclamation-triangle')
				} else {
					this.$axios
						.post('user/signup', this.form)
						.then(() => {
							// Signup successful
							this.alert('success', `Welcome aboard! ${this.form.firstname} 😃`, 'exclamation-triangle')
							return this.$emit('child-to-parent')
						})
						.catch(err => {
							return this.alert('danger', `Error! ${err.message}`, 'exclamation-triangle')
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
