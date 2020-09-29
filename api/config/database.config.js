require('dotenv').config({ path: 'api/.env' })

module.exports = {
	url: process.env.DB_URL,
}
