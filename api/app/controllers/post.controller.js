const Post = require('../models/post.model')

// Create and Save a new Post
exports.create = (req, res) => {
	// return res.send(req.body.title)
	// Validate request
	if (!req.body.title || !req.body.content) {
		return res.status(400).send({
			message: 'Missing Title, Empty body or Missing Author.',
		})
	}

	// Create a Post
	const post = new Post({
		title: req.body.title,
		description: req.body.description || '',
		brief:
			req.body.content.split(' ').length > 25
				? req.body.content
						.split(' ')
						.slice(0, 24)
						.join(' ')
				: req.body.content,
		content: req.body.content,
		claps: 0,
		cover: req.body.cover ? req.body.cover : 'https://source.unsplash.com/random/1920/1080',
	})

	// Save Post in the database
	post.save()
		.then(data => {
			res.send(data)
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || 'Some error occurred while creating the Post.',
			})
		})
}

// Retrieve and return all Posts from the database.
exports.findAll = (req, res) => {}

// Find a single Post with a PostId
exports.findOne = (req, res) => {}

// Update a Post identified by the PostId in the request
exports.update = (req, res) => {}

// Delete a Post with the specified PostId in the request
exports.delete = (req, res) => {}
