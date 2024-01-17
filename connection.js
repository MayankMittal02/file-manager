const {Client} = require('pg')

const pool = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "mayank",
    database: "propacity"

})

module.exports = pool