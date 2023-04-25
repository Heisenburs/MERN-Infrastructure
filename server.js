require('dotenv').config()

//* Connect to database
require('./config/database')

const express = require('express')
const path = require('path') // node module
const favicon = require('serve-favicon')
const logger = require('morgan')


const app = express();

// development port: 3001
// when deployed, we''l get a PORT provided by the app deploying it
const PORT = process.env.PORT || 3001 

//* Config
app.use(logger('dev')) // logger middleware - logs the request that the server is receiving
app.use(express.json()) // JSON payload middleware - for data coming from the frontend functions

// Configure both serve-favicon & static middleware to serve from the productiov 'build' folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')))
app.use(express.static(path.join(__dirname, 'build')))

// checks if token was sent and sets userData on the req (req. user)
app.use(require('./config/checkToken'));

//* All Other Routes
app.use('/api/users', require('./routes/api/users'))

//* 'Catch All' Route
// the catch all route (with the *) is necessary to return the index.html on all non-AJAX requests
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(PORT, () => {
    console.log(`PORT ${PORT}: Running...`);
})