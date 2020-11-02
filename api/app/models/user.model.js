const { String } = require('core-js')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

function hashPassword(value) {
	return bcrypt.hashSync(value, 10)
}

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		require: true,
	},
	photo: String,
	banner: String,
	social: String,
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
		set: hashPassword,
	},
})

module.exports = mongoose.model('User', UserSchema)
