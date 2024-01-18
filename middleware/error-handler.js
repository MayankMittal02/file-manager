const CustomAPIError = require('../errors/custom-api');

const errorHandlerMiddleware = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'Something went wrong try again later';

    if (error.code == 23505) {
        // const msg = `Duplicate value entered for ${Object.keys(
        //     error.keyValue
        // )} field, please choose another value`
        const msg = "folder already exist"
        error = new CustomAPIError(msg, 409);
    }

    res.status(error.statusCode).json({ msg: error.message })
}
module.exports = errorHandlerMiddleware