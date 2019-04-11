const express = require('express')
const router = express.Router()
const request = require('request')
const City = require("../models/City")
const helper = require("../../helper")

let arrCities = []
const cityDao = new helper()

// ----------------------------------
// check if online
// ----------------------------------
router.get('/sanity', function (req, res) {
    res.send("OK!")
})

// ----------------------------------
// Questions:
// - helping function - how can i use it ? 
// ----------------------------------

// ----------------------------------
// getting a single city
// rendering a single city
// ----------------------------------
router.get('/city', async function(req,res){
    const query = req.query
    const cityName = query.cityName

    const url = `http://api.apixu.com/v1/current.json?key=b2bd4bdcb0124f36bec75135191104&q=${cityName}`
    request.get(url, (error, response, body) => {
        const arg = JSON.parse(body)   
        res.send(arg)
    });
})

// -----------------------------------------
// returning the array of cities.
// rendering the array
// -----------------------------------------

router.get('/cities',  async function(req,res){
    arrCities = await City.find({})
    res.send(arrCities)
})

// -----------------------------------------
// saving city to DB by post.
// ToDo: return saved city
// -----------------------------------------
router.post('/city', function(req,res) {
    let cityName = req.body.cityName
    const url = `http://api.apixu.com/v1/current.json?key=b2bd4bdcb0124f36bec75135191104&q=${cityName}`
    request.get(url, (error, response, body) => {
        const arg = JSON.parse(body)   
        cityDao.saveCityToDB(arg)
    });
})

// -----------------------------------------
// searching and deleting the city by name.
// rendering deleted city
// -----------------------------------------
router.delete('/city', async function(req,res) {
    let cityName = req.body.cityName
    const deletedCity = await cityDao.deleteCityByName(cityName)
    res.send(deletedCity)
})

// --------------------------------
// helping function
// --------------------------------
const getCity = async function (argCity){
    const url = `http://api.apixu.com/v1/current.json?key=b2bd4bdcb0124f36bec75135191104&q=${argCity}`
    let lol = await request.get(url, function (error, response, body) {
        const arg = JSON.parse(body)   
        // console.log(arg)
        return arg
    });
    console.log(lol)
    return lol
}
module.exports = router