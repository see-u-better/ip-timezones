const zlib = require('node:zlib')
const decompress = require('decompress')
const fs = require('node:fs')
const path = require('node:path')
const needle = require('needle')

console.log('[i] Setting up the databases')
const config = require('./config')
const { db } = require('./database')

const timezoneMigrations = path.resolve(__dirname, 'migrations', 'database-migrations.sql')
const timezoneSeeders = path.resolve(__dirname, 'migrations', 'database-seeders.sql')
const archivePath = path.resolve(__dirname, 'database', 'database-ip-archive.zip')
const unarchivedPath = path.resolve(__dirname, 'database', 'database-ip')
const binaryName = 'database-ip.bin'
const binaryPath = path.resolve(__dirname, 'database', 'database-ip', binaryName)
const databaseIpPath = path.resolve(__dirname, 'database', 'database-ip.bin')
const baseUrl = 'https://www.ip2location.com/download/'
const params = new URLSearchParams({
    token: config.DOWNLOAD_TOKEN,
    file: config.DATABASE_CODE,
})

console.log('[i] Running the migrations')
fs.readFileSync(timezoneMigrations)
    .toString()
    .split(';')
    .map(migration => db.exec(migration))

console.log('[i] Running the seeders')
fs.readFileSync(timezoneSeeders)
    .toString()
    .split(';')
    .map(seed => db.exec(seed))

const downloadUrl = `${baseUrl}?${params}`

console.log('[i] Downloading archive')
new Promise((resolve, reject) => {
    needle.get(downloadUrl, { output: archivePath }, function (error, resp, body) {
        if (error) {
            return reject(error.message)
        }
        return resolve()
    })
})
.catch(error => {
    console.error(error)
    throw new Error(error)
})
.then(() => {
    console.log('[i] Extracting archive')
    return decompress(archivePath, unarchivedPath, {
        filter: file => {
            console.log('[i] filtering', file.path)
            return path.extname(file.path).toLowerCase() === '.bin'
        },
        map: file => {
            console.log('[i] maping', file.path)
            file.path = binaryName
            return file
        }
    })
})
.catch(error => {
    console.error(error)
    throw new Error(error)
})
.then(() => new Promise(resolve => setTimeout(() => resolve(), 1000)))
.then(() => {
    console.log('[i] Files cleanup ("MIMOP" -BBDaph)')
    fs.copyFileSync(binaryPath, databaseIpPath)
    fs.rmSync(unarchivedPath, { recursive: true })
    fs.rmSync(archivePath)
    console.log('[√] Setup completed')
})
