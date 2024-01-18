const jwt = require('jsonwebtoken')
require('dotenv').config();

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization

    try {
        const token = authHeader.split(" ")[1];
        const payLoad = jwt.verify(token, process.env.JWT_SECRET)
        console.log(payLoad)
        req.user = {
            userId: payLoad.userId,
        }
        console.log(req.user)
        next()
    }
    catch (err) {
        next(err)
    }
}

module.exports = auth