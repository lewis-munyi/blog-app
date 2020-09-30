module.exports = app => {
	// Import our user controller with all our CRUD methods
	const user = require('../controllers/user.controller.js')

	// Create a new user
	app.post('/signup', user.create)

	// Sign in an existing user
	app.post('/signin', user.signin)
}
