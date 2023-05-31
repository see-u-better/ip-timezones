const { Request, Response, NextFunction } = require('express')
const { db, ip2location } = require('../database')

/**
 * @param {Request} req
 * @param {Response} res
 */
const ipController = async (req, res) => {
    const ip = req.params?.ip
    let responseCode = 0
    let responseStatus = null
    let response = null

    if (!ip) {
        res.status(404)
        res.statusText = 'Not Found'
        res.json({ message: "IP Missing." })
        return res
    }
    try {
        const result = ip2location.getAll(ip)
        const countryCode = result.countryShort
        const timezoneParts = result.timeZone.split(':')
        const timezoneOffset = (parseInt(timezoneParts[0]) * 3600)
            + (parseInt(timezoneParts[1]) * 60)
        const dbRes = await new Promise((resolve, reject) => {
            db.get(`SELECT name
                        FROM timezones
                        WHERE DATETIME(time_start, 'unixepoch') <= DATETIME('now')
                        AND gmt_offset = ?
                        AND country_code = ?
                        ORDER BY time_start DESC
                        LIMIT 0,1
                    `, [
                timezoneOffset,
                countryCode,
            ], function (_, row) {
                return resolve(row)
            })
        })

        const timezone = dbRes?.name ?? null
        if (result.ip == '?') {
            throw new Error(`The IP ${ip} could not be found in the database`)
        }

        responseCode = 200
        response = {
            data: {
                ip: result.ip,
                ipNo: result.ipNo,
                countryShort: result.countryShort,
                countryLong: result.countryLong,
                region: result.region,
                city: result.city,
                zipCode: result.zipCode,
                latitude: result.latitude,
                longitude: result.longitude,
                timeZone: timezone ?? result.timeZone,
            }
        }
    } catch (e) {
        responseCode = 400
        responseStatus = "Bad Request"
        response = { message: "Invalid IP.", error: e?.message }
    }
    res.status(responseCode)
    res.statusText = responseStatus
    res.json(response)
}

module.exports = ipController
