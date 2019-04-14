const tempManager = TempManager()
const renderer = Renderer()

const handleSearch = async function () {
    const cityInput = $("#searchCityInput").val()
    await tempManager.getCityData(cityInput)
    const arr = tempManager.getTemps()
    renderer.renderTemps(arr)
}
const loadPage = async function () {
    const arr = await tempManager.getDataFromDB()
    renderer.renderTemps(arr)
    $("#searchCityBtn").on("click", handleSearch)
}
loadPage()
