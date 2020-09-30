const express = require('express')
const bodyParser = require('body-parser')
const chalk = require('chalk')
const mongoose = require('mongoose')
const dbConfig = require('./config/database.config')

// Configuring the database
mongoose.Promise = global.Promise

// Connecting to the database
mongoose
	.connect(dbConfig.url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log(chalk.green('Successfully connected to the database'))
	})
	.catch(err => {
		console.log(chalk.red('Could not connect to the database. Exiting now...', err))
		process.exit()
	})

// create express app
const app = express()

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a simple route
app.get('/', (req, res) => {
	res.json({ message: 'Welcome to our Blog!' })
})

// listen for requests
app.listen(3000, () => {
	console.log('Server is listening on port 3000')
})

require('./app/routes/user.routes.js')(app)
require('./app/routes/post.routes.js')(app)
