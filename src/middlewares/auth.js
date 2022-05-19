const jwt  = require('jsonwebtoken')
const { promisify } = require('util')
const { secret } = require('../config/auth.json')

async function Auth(req, res, next) {
    const { authorization } = req.headers;

    if(!authorization){
        return res.sendStatus(401);
    }

    const [, token] = authorization.split(' ');

    try {
        await promisify(jwt.verify)(token, secret);

        return next();
    } catch (err) {
        return res.sendStatus(401);
    }
};

module.exports = Auth;