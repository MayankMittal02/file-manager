const pool = require('../config/connectiondb')
const { StatusCodes } = require('http-status-codes')
const asycnWrapper = require('../middleware/async')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET
const EXPIRY_TIME = process.env.EXPIRY_TIME

const register = asycnWrapper(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "provide username , email and password" })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `insert into users(username , email , password) values($1,$2,$3) returning *`
    const registeredUser = await pool.query(query, [username, email, hashedPassword]);
    const user = registeredUser.rows[0]
    const token = jwt.sign({ userId: user.user_id }, JWT_SECRET, { expiresIn: EXPIRY_TIME });


    res.status(StatusCodes.CREATED).json({ token: token });
})

const login = asycnWrapper(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "provide email and password" })
    }


    const existingUserQuery = `select * from users where email = $1`
    const existingUser = await pool.query(existingUserQuery, [email])
    if (existingUser.rows.length == 0) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "User doesn't exist." });
    }
    const user = existingUser.rows[0];
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Invalid credentials! " });
    const token = jwt.sign({ userId: user.user_id }, JWT_SECRET, { expiresIn: EXPIRY_TIME });
    res.status(StatusCodes.OK).json({ token: token })
})

module.exports = { register, login }