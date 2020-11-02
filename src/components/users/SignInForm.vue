<template>
	<div class="container">
		<div style="width:100%" v-if="notif.message" class="d-flex justify-content-center">
			<div
				class="alert"
				:class="{ 'alert-success': notif.type == 'success', 'alert-danger': notif.type == 'danger', 'alert-info': notif.type == 'info' }"
			>
				<div v-html="notif.icon"></div>
				<strong>{{ notif.message }}</strong>
			</div>
		</div>
		<form>
			<fieldset>
				<div class=" row form-group">
					<div class="col-sm-12 col-md-4">
						<label for="email">Email address</label>
					</div>
					<div class="sm-12 col-md-8">
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
					<div class="col-sm-12 col-md-4">
						<label for="password">Password</label>
					</div>
					<div class="col-sm-12 col-md-8">
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
			login() {
				// Make sure all fields are filled
				if (this.form.password == null || this.form.email == null) {
					this.alert('danger', `Fill in all the fields`, 'exclamation-triangle')
				}
				// Ensure correct email format
				else if (!/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.form.email)) {
					this.alert('danger', `Enter correct email format`, 'exclamation-triangle')
				} else {
					this.$axios
						.post('user/signin', this.form)
						.then(res => {
							// Login successful
							let { name, email, social, photo, banner, _id } = res.data.user
							localStorage.setItem('auth_token', res.data.token)
							localStorage.setItem('user', JSON.stringify({ name, email, social, photo, banner, _id }))
							this.alert('success', `Welcome back ${name.split(' ')[0]}!`, 'circle-check')
							location.reload()
						})
						.catch(err => {
							if (err.response.status == 401 || err.response.status == 404) {
								this.alert('danger', err.response.data.message)
							} else {
								this.alert('danger', err.message)
							}
						})
				}
			},
		},
	}
</script>

<style></style>
