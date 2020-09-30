const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.create = (req, res) => {
	const { firstname, lastname, email, password, photo, social } = req.body

	if (!firstname || !lastname || !email || !password) {
		return res.status(400).send({
			message: 'Name, Email, or Password fields missing',
		})
	}

	const user = new User({
		email,
		password,
		name: firstname.concat(' ', lastname),
		social: social || '',
		photo: photo || `https://ui-avatars.com/api/?name=${firstname}+${lastname}?size=512`,
	})

	user.save()
		.then(user => {
			res.send(user)
		})
		.catch(error => {
			res.status(error.status).send({
				message: error.message,
			})
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
	// Todo: Auth check

	const { _id, firstname, lastname, email, password, photo, social } = req.body.user

	if (!firstname || !lastname || !email || !password) {
		return res.status(400).send({
			message: 'Name, Email, or Password fields missing',
		})
	}

	// Find user and update
	User.findByIdAndUpdate(
		_id,
		{
			email,
			password,
			name: firstname.concat(' ', lastname),
			social: social || '',
			photo: photo || `https://ui-avatars.com/api/?name=${firstname}+${lastname}?size=512`,
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
