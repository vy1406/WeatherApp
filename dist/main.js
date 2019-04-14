const tempManager = TempManager()
const renderer = Renderer()

const handleSearch = async function(){
    const cityInput = $("#searchCityInput").val()
    await tempManager.getCityData(cityInput)
    const arr = tempManager.getTemps()
    console.log("showing arr: ")
    console.log(arr)
    renderer.renderTemps(arr)
}
const loadPage  = function() {
    renderer.renderTemps(tempManager.getDataFromDB())
    $("#searchCityBtn").on("click", handleSearch)
}



loadPage()
