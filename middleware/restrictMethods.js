const { Request, Response, NextFunction } = require('express')

/**
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
const restrictMethods = (req, res, next) => {
    const method = req.method
    if (method !== 'GET') {
        res.status(405)
        res.statusText = 'Method Not Allowed'
        res.json({ message: `${method} method is not allowed.` })
    } else {
        next()
    }
}

module.exports = restrictMethods;
