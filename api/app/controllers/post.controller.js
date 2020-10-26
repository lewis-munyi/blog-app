const Post = require('../models/post.model')
const User = require('../models/user.model')
const jwt_decode = require('jwt-decode')

// Create and Save a new Post
exports.create = (req, res) => {
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
		author_id: jwt_decode(req.headers.authorization.split(' ')[1]).user._id,
		author: jwt_decode(req.headers.authorization.split(' ')[1]).user.name,
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

// Retrieve and return all posts by popularity/timestamp
exports.findAll = (req, res) => {
	let sortBy
	req.query.sort == 'popularity'
		? (sortBy = {
				claps: -1,
		  })
		: (sortBy = {
				_id: -1,
		  })

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

// Update a Post by ID
exports.update = (req, res) => {
	const user = jwt_decode(req.headers.authorization.split(' ')[1]).user._id

	if (!req.body.title || !req.body.content) {
		return res.status(400).send({
			message: 'Missing Title, Empty body or Missing Author',
		})
	}

	Post.findById(req.params.postId).then(post => {
		if (!post) {
			return res.status(404).send({
				message: 'Post not found',
			})
		}

		if (String(post.author_id) !== String(user)) {
			res.status(401).send({
				message: 'You are not authorized to perform this action!',
			})
		}
	})

	// Find post and update it with the request body
	Post.findByIdAndUpdate(
		req.params.postId,
		{
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
			cover: req.body.cover || 'https://source.unsplash.com/random/1920/1080',
		},
		{
			new: true,
		}
	)
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
					message: 'Post not found matching the supplied ID',
				})
			}
			return res.status(500).send({
				message: 'Error updating post',
			})
		})
}

// Delete a Post by ID
exports.delete = (req, res) => {
	const user = jwt_decode(req.headers.authorization.split(' ')[1]).user._id

	Post.findById(req.params.postId).then(post => {
		if (!post) {
			return res.status(404).send({
				message: 'Post not found',
			})
		}

		if (String(post.author_id) !== String(user)) {
			res.status(401).send({
				message: 'You are not authorized to perform this action!',
			})
		}
	})

	Post.findByIdAndRemove(req.params.postId)
		.then(Post => {
			if (!Post) {
				return res.status(404).send({
					message: 'Post not found',
				})
			}
			res.send({
				message: 'Post deleted!',
			})
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

exports.findBlog = (req, res) => {
	User.findOne({ _id: req.params.id })
		.then(user => {
			// Successful request
			if (!user) {
				// No user
				return res.status(404).send({
					message: 'User not found',
				})
			}
			Post.find({ author_id: req.params.id })
				.sort({ _id: -1 })
				.then(posts => {
					// Successful request
					if (!posts) {
						// No post
						return res.status(404).send({ user, message: 'No posts found' })
					}
					return res.status(200).send({ user, posts })
				})
				.catch(err => {
					return res.status(500).send({
						message: 'An internal server error occured: ' + err.message,
					})
				})
		})
		.catch(err => {
			return res.status(500).send({
				message: 'An internal server error occured: ' + err.message,
			})
		})
}
