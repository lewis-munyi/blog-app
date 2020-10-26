const cors = require('cors')
const chalk = require('chalk')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const serveStatic = require('serve-static')
const dbConfig = require('./config/database.config')
const expressListRoutes = require('express-list-routes')

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
		// console.log(chalk.green('Successfully connected to the database'))
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

app.use('/api/v1/user', userRouter)

app.use('/api/v1/posts', postRouter)

app.use(serveStatic('dist'))

expressListRoutes({ prefix: '/api/v1', spacer: 7 }, '\n\nPost Routes:', postRouter)
expressListRoutes({ prefix: '/api/v1', spacer: 7 }, '\n\nUser Routes:', userRouter)

// listen for requests
app.listen(process.env.PORT || 3000, () => {
	// console.log('\n\n')
	console.log(`\nServing app on port ${process.env.PORT || 3000}`)
})
