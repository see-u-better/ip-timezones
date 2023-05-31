const { Request, Response, NextFunction } = require('express')
const { db, ip2location } = require('../database')

/**
 * @param {Request} req
 * @param {Response} res
 */
const ipController = async (req, res) => {
    const tz = req.params?.timezone
    let responseCode = 0
    let responseStatus = null
    let response = null

    const bindings = []
    let tzClause = ''
    if (tz) {
        bindings.push(tz)
        tzClause = `AND name LIKE ?`
    }
    const dbRes = await new Promise((resolve, reject) => {
        db.all(`
                WITH latest_tz AS (
                    SELECT
                    *,
                    ROW_NUMBER() OVER(PARTITION BY name ORDER BY time_start DESC) AS row_number
                    FROM timezones
                    WHERE DATETIME(time_start, 'unixepoch') <= DATETIME('now')
                )
                SELECT name, country_code, dst, gmt_offset
                FROM latest_tz
                WHERE row_number = 1
                ${tzClause}
                ORDER BY gmt_offset ASC
            `, bindings, function (_, row) {
            return resolve(row)
        })
    })
    responseCode = 200
    response = { data: dbRes }
    if (tzClause) {
        if (dbRes[0] ?? null) {
            response = { data: dbRes[0] }
        } else {
            responseCode = 404
            responseStatus = "Not Found"
            response = { message: "This timezone cannot be found." }
        }
    }
    res.status(responseCode)
    res.statusText = responseStatus
    res.json(response)
}

module.exports = ipController
