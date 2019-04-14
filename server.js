const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const api = require('./server/routes/api')
const helper = require("./helper.js")

mongoose.connect(process.env.CONNECTION_STRING || "mongodb://localhost/weatherDB", {useNewUrlParser: true})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

app.use('/', api)

const port = 8080
app.listen(process.env.PORT || port, function () {
    console.log(`Server running on ${port}`)
})



const dataLoader = new helper()
// dataLoader.dropCollection()
// dataLoader.populateDB_with_tempData()


// -------------------------------
// populate data in order to have something to work with
// -------------------------------
let toPopulate = true;
const populateIfFalse = function(){
    if ( toPopulate == true){
        dataLoader.populateDB_with_tempData()
        toPopulate = false;
    }
}

populateIfFalse()