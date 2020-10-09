<template>
	<div class="container">
		<form>
			<fieldset>
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
							v-model="form.firstname"
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
							v-model="form.lastname"
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
							v-model="form.email"
						/>
						<small id="emailHelp" class="form-text text-muted"
							>We'll never share your email with anyone else.</small
						>
					</div>
				</div>
				<div class="row form-group">
					<div class="col col-sm-12 col-md-4">
						<label for="password">Password</label>
					</div>
					<div class="col col-sm-12 col-md-8">
						<input
							type="password"
							class="form-control"
							id="password"
							placeholder="Password"
							v-model="form.password"
						/>
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
							v-model="form.repeatPassword"
						/>
					</div>
				</div>
				<div class=" row form-group">
					<div class="col col-sm-12 col-md-4">
						<label for="email">Social Media</label>
					</div>
					<div class="col col-sm-12 col-md-8">
						<input
							type="text"
							class="form-control"
							id="social"
							aria-describedby="socialHelp"
							placeholder="Enter a valid link to your social media account"
							v-model="form.social"
						/>
						<small id="socialHelp" class="form-text text-muted"
							>This is not a required field</small
						>
					</div>
				</div>
				<div class=" row form-group">
					<div class="col col-sm-12 col-md-4">
						<label for="email">Photo URL</label>
					</div>
					<div class="col col-sm-12 col-md-8">
						<input
							type="text"
							class="form-control"
							id="photo"
							aria-describedby="photoHelp"
							placeholder="Enter a valid link to your profile photo"
							v-model="form.photo"
						/>
						<small id="photoHelp" class="form-text text-muted"
							>This is not a required field</small
						>
					</div>
				</div>
				<div class="row">
					<div class="col-md-8 d-flex justify-content-center offset-md-3">
						<a v-on:click="signup" @submit.prevent class="btn btn-primary mt-3">
							Proceed
						</a>
					</div>
				</div>
			</fieldset>
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
			},
		}
	},
	methods: {
		signup() {
			let { email, password, repeatPassword, photo } = this.form

			// Make sure all fields are filled
			if (Object.values(this.form).some(o => o === null)) {
				return console.log('Fill in all fields')
			} else if (password !== repeatPassword) {
				return console.error('Passwords do not match')
			}
			// Ensure correct URL format
			else if (
				!/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.test(
					photo
				)
			) {
				return console.error('Enter correct photo URL')
			}
			// Ensure correct email format
			else if (!/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
				console.log('Enter correct email format')
			} else {
				this.$axios
					.post('user/signup', this.form)
					.then(res => {
						// Signup successful
						console.log(res.status)
						// alert('Signup successful! Log in to continue')
						console.log('Signup successful!')
						this.$emit('child-to-parent')
						// return location.reload()
					})
					.catch(err => {
						alert('Error! ' + err.message)
						return console.error(err)
					})
			}
		},
	},
}
</script>

<style></style>
