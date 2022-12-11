const jwt = require('jsonwebtoken')


module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json("access reject")
    }
    try {
        const decodeToken = jwt.verify(token, "verySecretValue")
        req.user = decodeToken
        next();
    }
    catch (err) {
        res.status(400).json("wrong token")
    }
}