const City = require("./server/models/City")
const request = require("request")

class helper {
    constructor() {
    }
    dropCollection() {
        City.collection.drop()
        console.log("collection City is dropped")
    }
    async getCities(){
        let arr = await City.find({})
        return arr
    }
    // ------------------------------
    // Populating my db with some data so i can work... 
    // ------------------------------
    populateDB_with_tempData() {
        let url = `http://api.apixu.com/v1/current.json?key=b2bd4bdcb0124f36bec75135191104&q=London`
        request.get(url, (error, response, body) => {
            const arg = JSON.parse(body)
            // console.log(arg)
            this.saveCityToDB(arg)
        });

        url = `http://api.apixu.com/v1/current.json?key=b2bd4bdcb0124f36bec75135191104&q=Berlin`
        request.get(url, (error, response, body) => {
            const arg = JSON.parse(body)
            // console.log(arg)
            this.saveCityToDB(arg)
        });

        url = `http://api.apixu.com/v1/current.json?key=b2bd4bdcb0124f36bec75135191104&q=Tokyo`
        request.get(url, (error, response, body) => {
            const arg = JSON.parse(body)
            // console.log(arg)
            this.saveCityToDB(arg)
        });

        url = `http://api.apixu.com/v1/current.json?key=b2bd4bdcb0124f36bec75135191104&q=Moscow`
        request.get(url, (error, response, body) => {
            const arg = JSON.parse(body)
            // console.log(arg)
            this.saveCityToDB(arg)
        });
        console.log("populated the collection City with some cities got from api")
    }
    saveCityToDB(apiCity) {
        let city = new City({
            name: apiCity.location.name,
            updateAt: apiCity.current.last_updated,
            temperature: apiCity.current.temp_c,
            condition: apiCity.current.condition.text,
            conditionPic: apiCity.current.condition.icon,
            isNew : false
        })
        city.save()
        console.log(`City ${city.name} was saved, with the id: ${city._id}`)
    }
    async deleteCityByName(argName) {
        const cityToDelete = await City.find({ name: argName }, function (error, res) {
        })
        const curID = cityToDelete[0]._id
        const deletedCity = await City.findByIdAndDelete(curID, function (err) {
            let message = ""
            if (!err) {
                message = `the city with ${curID} was deleted`;
            }
            else {
                message = `error deleting city with id ${curID}`;
            }
            return message
        })
        
        return cityToDelete
    }
}
module.exports = helper