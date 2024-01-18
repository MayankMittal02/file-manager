require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");

const app = express();
const errorHandlerMiddleware = require('./middleware/error-handler')


const pool = require('./config/connectiondb.js')
const s3 = require('./config/connection-s3.js')


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const folder_routes = require('./routes/folder-routes.js')
const user_routers = require('./routes/user-routes.js')
const file_routes = require('./routes/file-routes.js')

app.use('/folders', folder_routes)
app.use('/user', user_routers)
app.use('/files' , file_routes)

app.use(errorHandlerMiddleware)

app.all('*', function (req, res) {
    res.send("not found");
})



// app.use(errorHandlerMiddleware)


pool.connect().then(() => {
    console.log('App connected to database');
    app.listen(5000, function () {
        console.log("server started");
    });
})

