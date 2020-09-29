module.exports = app => {
	// Import our Post controller with all our CRUD methods
	const post = require('../controllers/post.controller.js')

	// Create a new post
	app.post('/post', post.create)

	// Retrieve latest posts
	app.get('/posts', post.findAll)

	// Retrieve a single post by id
	app.get('/post/:postId', post.findOne)

	// Update a post by id
	app.put('/post/:postId', post.update)

	// Delete a post by noteId
	app.delete('/post/:postId', post.delete)
}
