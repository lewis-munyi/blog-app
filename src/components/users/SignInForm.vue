<template>
	<div class="container">
		<form>
			<fieldset>
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
						<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
					</div>
				</div>
				<div class="row form-group">
					<div class="col col-sm-12 col-md-4">
						<label for="password">Password</label>
					</div>
					<div class="col col-sm-12 col-md-8">
						<input type="password" class="form-control" id="password" placeholder="Password" v-model="form.password" />
					</div>
				</div>
				<div class="row">
					<div class="col-md-8 d-flex justify-content-center offset-md-3">
						<a v-on:click="login" @submit.prevent class="btn btn-ripple btn-primary mt-3">
							Submit
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
					email: null,
					password: null,
				},
			}
		},
		methods: {
			login() {
				// Make sure all fields are filled
				if (this.form.password == null || this.form.email == null) {
					console.log('Fill in all fields')
				}
				// Ensure correct email format
				else if (!/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.form.email)) {
					console.log('Enter correct email format')
				} else {
					this.$axios
						.post('user/signin', this.form)
						.then(res => {
							// Login successful
							let { name, email, social, photo, _id } = res.data.user
							localStorage.setItem('auth_token', res.data.token)
							localStorage.setItem('user', JSON.stringify({ name, email, social, photo, _id }))
							location.reload()
						})
						.catch(err => {
							console.log(err)
						})
				}
			},
		},
	}
</script>

<style></style>
