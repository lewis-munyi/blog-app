<template>
	<div class="container">
		<form v-if="form !== null" @submit.prevent="verifyDetails">
			<div v-if="notif.message" class="row justify-content-center">
				<div
					class="alert"
					:class="{
						'alert-success': notif.type == 'success',
						'alert-danger': notif.type == 'danger',
						'alert-warning': notif.type == 'warning',
						'alert-info': notif.type == 'info',
					}"
				>
					<div v-html="notif.icon"></div>
					<strong>{{ notif.message }}</strong>
				</div>
			</div>
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
						v-model.lazy="firstName"
						disabled
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
						v-model.lazy="lastName"
						disabled
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
					<label for="photo">Profile Photo URL</label>
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
			<div class="row">
				<div class="col-md-8 d-flex justify-content-center offset-md-3">
					<button class="btn btn-ripple btn-primary mt-3" :disabled="similarValues">
						Proceed
					</button>
				</div>
			</div>
		</form>
	</div>
</template>

<script>
	export default {
		name: 'EditUser',
		components: {},
		data() {
			return {
				form: null,
				user: null,
				notif: {
					type: '',
					message: '',
					icon: '',
				},
			}
		},
		computed: {
			firstName() {
				return this.form.name.split(' ')[0]
			},
			lastName() {
				return this.form.name.split(' ')[1]
			},
			similarValues() {
				return JSON.stringify(this.user) === JSON.stringify(this.form)
			},
			fullName() {
				return `${this.firstName} ${this.lastName}`
			},
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
			verifyDetails() {
				// If values have changed
				if (!this.similarValues) {
					// At least first name should be present
					if (!this.firstName && !this.lastName) return this.alert('warning', 'Name is required')

					// Verify email
					if (!/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.form.email)) return this.alert('warning', 'Incorrect email format')

					// Verify profile photo urls
					if (
						this.form.photo &&
						!/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.test(
							this.form.photo
						)
					)
						return this.alert('warning', 'Incorrect Profile Picture url')

					// Verify banner photo urls
					if (
						this.form.banner &&
						!/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.test(
							this.form.banner
						)
					)
						return this.alert('warning', 'Incorrect Banner Picture url')

					// Verify social photo urls
					if (
						this.form.social &&
						!/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.test(
							this.form.social
						)
					)
						return this.alert('warning', 'Incorrect Social media url')

					// Passwords have changed
					if (this.form.password && this.form.password !== this.form.repeatPassword) return this.alert('warning', 'Passwords do not match')

					// Check password length
					if (this.form.password && this.form.password.length < 6) return this.alert('warning', 'Password is too short')
				}
				return this.updateUser()
			},
			updateUser() {
				delete this.form._id
				// return console.table(this.form)
				this.$axios.post('/user/update', { user: this.form }).then(() => {
					this.alert('success', 'Updated successfully')
					localStorage.clear()
					setTimeout(() => {
						this.$router.go('')
					}, 2000)
				})
			},
		},
		created() {
			if (localStorage.getItem('user')) {
				this.form = JSON.parse(localStorage.getItem('user'))
				this.form.firstName = this.form.name.split(' ')[0]
				this.form.lastName = this.form.name.split(' ')[1]
				this.user = { ...this.form }
			}
		},
	}
</script>

<style></style>
