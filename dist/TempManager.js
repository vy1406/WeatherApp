let arrTemps = []

const TempManager = function () {

    const getTemps = function () {
        return arrTemps
    }
    // -----------------------------
    // sending a get request to the server to get the array of cities.
    // ToDo: Check
    // -----------------------------
    const getDataFromDB = function () {
        console.log("In TempManager: getting the data...")
        $.get('/cities', async function (result) {
            // arrTemps = await result.cities
            // console.log("in TempManager, sending the data from sever to client.")
            // console.log(result)
            arrTemps = result
            getTemps()
        })
    }
    // --------------------------------
    // getting data from api thru my server and adding to the arrTemps
    // ! IMPORTANT ! arrTemp - lives only in this scope.. ( for now ... he he he... )
    // --------------------------------
    const getCityData = async function () {
        const inputVal = $("#searchCityInput").val()
        const someCity = await $.get('/city', `cityName=${inputVal}`)
        let city = {
            name: someCity.location.name,
            updateAt: someCity.current.last_updated,
            temperature: someCity.current.temp_c,
            condition: someCity.current.condition.text,
            conditionPic: someCity.current.condition.icon
        }
        arrTemps.push(city)
    }
    // ---------------------------------
    // saving city thru post
    // ! ! !    CHECK   ! ! !
    // ---------------------------------
    const saveCity = async function (argCityName) {
        const city = arrTemps.find(c => c.name === argCityName)
        const answer = await $.post('/city', { cityName: city.name})
        console.log("in saveCity : ")
        console.log(answer)
    }
    // ---------------------------------
    // deleting city thru post
    // ! ! !    CHECK   ! ! !
    // ---------------------------------
    const removeCity = async function (argCityName) {
        const answer = await $.ajax({
            type: "DELETE",
            url: '/city' + url_id,
            data: {cityName: argCityName},
        });
        console.log("in removeCity : ")
        console.log(answer)
    }
    return {
        getDataFromDB: getDataFromDB,
        getTemps: getTemps,
        getCityData: getCityData,
        saveCity: saveCity,
        removeCity: removeCity
    }
}