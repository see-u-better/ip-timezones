
const dotenv = require('dotenv')

const PORT = process.env.PORT || 9393
const DATABASE_CODE = process.env.DATABASE_CODE || 'DB11LITEBIN'
let API_KEY = process.env.API_KEY
let DOWNLOAD_TOKEN = null

const reloadConfig = function () {
    /* istanbul ignore next */
    if (process.env.NODE_ENV != 'test') {
        dotenv.config(__dirname, '.env')
    }
    API_KEY = process.env.API_KEY
    DOWNLOAD_TOKEN = process.env.DOWNLOAD_TOKEN
}

reloadConfig()

module.exports = {
    PORT,
    API_KEY,
    DOWNLOAD_TOKEN,
    DATABASE_CODE,
    reloadConfig,
}
