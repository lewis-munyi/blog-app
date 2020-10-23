const User = require('../models/user.model')
const Post = require('../models/post.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const jwt_decode = require('jwt-decode')

exports.create = (req, res) => {
	const { firstname, lastname, email, password, photo, social, banner } = req.body

	if (!firstname || !lastname || !email || !password) {
		return res.status(400).send({
			message: 'Name, Email, or Password fields missing',
		})
	}

	User.findOne({ email })
		.then(user => {
			// Successful request
			if (!user) {
				// No user
				const user = new User({
					email,
					password,
					name: firstname.concat(' ', lastname),
					social: social || '',
					photo: photo || `https://ui-avatars.com/api/?name=${firstname}+${lastname}?size=512`,
					banner: banner || 'https://source.unsplash.com/1_CMoFsPfso/1366x768',
				})

				user.save()
					.then(user => {
						return res.send(user)
					})
					.catch(error => {
						res.status(error.status).send({
							message: error.message,
						})
					})
			} else {
				return res.status(409).send({ message: 'User already exists' })
			}
		})
		.catch(err => {
			return res.status(500).send({ message: err.message })
		})
}

exports.signin = (req, res) => {
	const { email, password } = req.body

	if (!email || !password) {
		return res.status(400).send({
			message: 'Fill out all the fields',
		})
	}

	User.findOne({ email })
		.then(user => {
			// Successful request
			if (!user) {
				// No user
				return res.status(404).send({
					message: 'User not found',
				})
			}

			if (bcrypt.compareSync(password, user.password)) {
				// Success - Create web token
				const token = jwt.sign({ user }, 'yourSecretKey', {
					expiresIn: '24h',
				})

				return res.json({
					user,
					token,
				})
			} else {
				// Incorrect password
				res.status(401).json({
					message: 'Incorrect credentials',
				})
			}
		})
		.catch(err => {
			return res.status(500).send({
				message: 'An internal server error occured: ' + err.message,
			})
		})
}

exports.update = (req, res) => {
	const { firstname, lastname, email, password, photo, social, banner } = req.body.user

	const user = jwt_decode(req.headers.authorization.split(' ')[1]).user._id

	if (!firstname || !lastname || !email || !password) {
		return res.status(400).send({
			message: 'Name, Email, or Password fields missing',
		})
	}

	// Find user and update
	User.findByIdAndUpdate(
		user,
		{
			email,
			password,
			name: firstname.concat(' ', lastname),
			social: social || '',
			photo: photo || `https://ui-avatars.com/api/?name=${firstname}+${lastname}?size=512`,
			banner: banner || 'https://source.unsplash.com/random/1920x1080',
		},
		{ new: true } // Return the updated
	)
		.then(user => {
			return res.send(user)
		})
		.catch(error => {
			if (error.kind === 'ObjectId') {
				return res.status(404).send({
					message: 'User not found',
				})
			}
			return res.status(error.status).send({
				message: error.message,
			})
		})
}

exports.delete = (req, res) => {
	const user = jwt_decode(req.headers.authorization.split(' ')[1]).user._id
	Post.deleteMany({ author_id: user }).catch(error => {
		return res.status(500).send({ message: 'Error deleting your posts' + error.message })
	})

	User.findByIdAndRemove(user)
		.then(user => {
			if (!user) {
				return res.status(404).send({
					message: "Unfortunately, we don't know you :/",
				})
			}
			res.send({ message: 'Thanos has snapped, for you!' })
		})
		.catch(err => {
			if (err.kind === 'ObjectId' || err.name === 'NotFound') {
				return res.status(404).send({
					message: "That's strange. We cannot find your ID",
				})
			}
			return res.status(500).send({
				message: 'An internal error occurred while deleting you. Try again later',
			})
		})
}

exports.verify = (req, res) => {
	// Verify auth token is still valid
	return res.status(200).send({ message: 'ok' })
}
