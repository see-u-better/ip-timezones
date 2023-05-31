const { Request, Response, NextFunction } = require('express')
const { API_KEY } = require('../config')

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
const auth = (req, res, next) => {
    const key = req.headers?.['x-api-key']
    if (key != API_KEY) {
        res.status(401)
        res.statusText = 'Unauthorized'
        res.json({ message: "API Key Missing." })
    } else {
        next()
    }
}

module.exports = auth;
