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

        // $("img").on("click", function(){
        //     const inputValue = $(this).closest(".singleFood").find(".ingredients")[0].children[0].innerText
        //     console.log(inputValue)
        // })
    }

    return {
        renderTemps: renderTemps
    }
}