const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const path = require('path')
const helmet = require('helmet')
const compress = require('compression')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 5000

// Routes
const apiRouter = require('./routes/api')

// parse body params and attache them to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// gzip compression
app.use(compress())

// secure servers by setting various HTTP headers
app.use(helmet())

// enable CORS - Cross Origin Resource Sharing
app.use(cors())
app.use(logger('dev'))

// api call
app.use('/api', apiRouter)

// production
if (process.env.NODE_ENV === 'production') {
	// Serve any static files
	app.use(express.static(path.join(__dirname, 'client/build')))

	// Handle React routing, return all requests to React app
	app.get('*', function(req, res) {
		res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
	})
}

// Listen
app.listen(port, () => console.log(`Listening on port ${port}`))
