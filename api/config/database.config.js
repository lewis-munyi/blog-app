const result = require('dotenv').config()

if (result.error) {
	throw result.error
}

module.exports = {
	url: process.env.DB_URL,
}
