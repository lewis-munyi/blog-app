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
	profile: String,
	Social: String,
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

const model = mongoose.model('User', UserSchema)

module.exports = model
