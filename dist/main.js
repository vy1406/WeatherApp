const tempManager = TempManager()
const renderer = Renderer()


const post = function () {
    console.log("in main: rendering temps!")
    $("#searchCityBtn").on("click", tempManager.getCityData)
    renderer.renderTemps(tempManager.getDataFromDB)

}

post()