const sqlite3 = require('sqlite3').verbose()
const { IP2Location } = require("ip2location-nodejs")
const path = require('path')

const db = new sqlite3.Database(path.resolve(__dirname, 'database.db'))
const ip2location = new IP2Location()
ip2location.open(path.resolve(__dirname, 'database-ip.bin'))

module.exports = {
    db,
    ip2location,
}
