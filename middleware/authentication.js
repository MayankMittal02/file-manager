const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization

    try {
        const token = authHeader.split(" ")[1];
        const payLoad = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {
            userId: payLoad.userId,
        }
        next()
    }
    catch (err) {
        next(err)
    }
}

module.exports = auth