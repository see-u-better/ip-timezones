const express = require('express')
const router = express.Router()
const ipController = require('../controllers/ipController')
const timezoneController = require('../controllers/timezoneController')
const { faviconSvg, indexHtml } = require('../controllers/staticController')

router.get('/', (_, res) => {
    res.status(200)
    res.header('Content-Type', 'text/html; charset=utf-8')
    res.header('X-Robots-Tag', 'noindex')
    res.send(indexHtml)
})
router.get('/favicon.svg', (_, res) => {
    res.status(200)
    res.header('Content-Type', 'image/svg+xml; charset=utf-8')
    res.header('X-Robots-Tag', 'noindex')
    res.send(faviconSvg)
})

router.get('/api/', (_, res) => {
    res.status(200)
    res.json({ message: 'Welcome.' })
})

router.get('/api/ip/:ip(*)?', ipController)
router.get('/api/timezone/:timezone(*)?', timezoneController)

module.exports = router
