const express = require('express');
const bodyParser = require("body-parser");
// const errorHandlerMiddleware = require('./middleware/')

const app = express();

const pool = require('./connection.js')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const folder_routes = require('./routes/folder-routes.js')

app.use('' , folder_routes)
app.all('*',function(req , res){
    res.send("not found");
})


// app.use(errorHandlerMiddleware)


pool.connect().then(()=>{
    console.log('App connected to database');
    app.listen(5000, function () {
        console.log("server started");
    });
})

