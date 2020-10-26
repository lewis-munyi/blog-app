const express = require('express')
const bodyParser = require('body-parser')
const chalk = require('chalk')
const mongoose = require('mongoose')
const dbConfig = require('./config/database.config')
const cors = require('cors')
const serveStatic = require("serve-static")
const path = require('path');

const userRouter = require('./app/routes/user.routes')
const postRouter = require('./app/routes/post.routes')

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
app.use(cors())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a simple route
// app.get('/', (req, res) => {
// 	res.json({ message: 'Welcome to our Blog! Browse the docs to see how you could use this api.' })
// })


app.use('/api/v1/user', userRouter)

app.use('/api/v1/posts', postRouter)

app.use(serveStatic(path.join(__dirname, 'dist')))

// listen for requests
app.listen(process.env.PORT || 3000, () => {
	console.log('Server is listening on port 3000')
})

