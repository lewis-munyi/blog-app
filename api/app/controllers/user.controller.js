const User = require('../models/user.model')

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
