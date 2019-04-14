const Renderer = function () {

    // -----------------------------
    // Main and only function.
    // -----------------------------
    const renderTemps = function (arrTemps) {   
        $("#temp-container").empty()
        addTemps(arrTemps)
    }

    // -----------------------------
    // Rendering
    // -----------------------------
    const addTemps = function (arrTemps) {
        const source = $("#temp-template").html()
        const template = Handlebars.compile(source)

        let newHtml = template({arrTemps})
        $("#temp-container").append(newHtml)

        $("i").on("click", async function(){
            const cityname = $(this).closest(".singleTemp").find(".city")[0].innerText
            // tempManager.saveCity(cityname)
            tempManager.changeCityState(cityname)
            console.log(cityname)
        })
    }
    
    return {
        renderTemps: renderTemps
    }
}