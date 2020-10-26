// const result = require('dotenv').config({ path: './api/.env' })

// if (result.error) {
// 	throw result.error
// }

module.exports = {
	url: process.env.DB_URL,
}
