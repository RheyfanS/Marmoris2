const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const homeRouter = require('./routes/homeRoutes')
const port = process.env.port || 8008;
const app = express();

//db connect
mongoose.connect('mongodb://127.0.0.1:27017/Marmoris',{useNewUrlParser:true})
const db = mongoose.connection;

db.on("error",()=>{
    console.log("Error in connection")
})
db.on('open',()=>{
    console.log("Database Connect")
})

app.set('view engine','ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use('/', homeRouter)
app.listen(port)