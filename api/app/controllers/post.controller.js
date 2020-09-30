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
exports.findAll = (req, res) => {
	let sortBy
	req.query.sort == 'popularity' ? (sortBy = { claps: -1 }) : (sortBy = { _id: -1 })

	Post.find()
		.sort(sortBy)
		.then(posts => {
			res.send(posts)
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving posts.',
			})
		})
}

// Find a single Post by id
exports.findOne = (req, res) => {
	Post.findById(req.params.postId)
		.then(post => {
			if (!post) {
				return res.status(404).send({
					message: 'Post not found',
				})
			}
			res.send(post)
		})
		.catch(err => {
			if (err.kind === 'ObjectId') {
				return res.status(404).send({
					message: 'Post not found. Please check the Id supplied',
				})
			}
			return res.status(500).send({
				message: 'Error retrieving post with id ' + req.params.postId,
			})
		})
}

// Update a Post identified by the PostId in the request
exports.update = (req, res) => {}

// Delete a Post by ID
exports.delete = (req, res) => {
	// Todo: Add Auth Check

	Post.findByIdAndRemove(req.params.postId)
		.then(Post => {
			if (!Post) {
				return res.status(404).send({
					message: 'Post not found',
				})
			}
			res.send({ message: 'Post deleted!' })
		})
		.catch(err => {
			if (err.kind === 'ObjectId' || err.name === 'NotFound') {
				return res.status(404).send({
					message: 'Post not found with id ' + req.params.postId,
				})
			}
			return res.status(500).send({
				message: 'An internal error occurred while deleting the post. Try again later',
			})
		})
}
