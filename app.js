const express = require('express')
const routes = require('./routes')
const auth = require('./middleware/auth')
const restrictMethods = require('./middleware/restrictMethods')
const { reloadConfig } = require('./config')
const app = express()

app.use('/api', auth)
app.use('/', restrictMethods)
app.use('/', routes)

/* istanbul ignore next */
if (process.env.NODE_ENV == 'test') {
    app.removeApiKeyForTests = function () {
        delete process.env.API_KEY
        reloadConfig()
    }
}

module.exports = app
