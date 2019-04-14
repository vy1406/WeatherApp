const Renderer = function () {

    // -----------------------------
    // Main and only function.
    // -----------------------------
    const renderTemps = function (temps) {
        $("#temps").empty();
        
        addTemps(temps)
    }

    // -----------------------------
    // 
    // -----------------------------
    const addTemps = function (temps) {
        console.log("in Renderer: rendering temps!")
    }

    return {
        renderTemps: renderTemps
    }
}