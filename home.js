var nf = d3.format(".1f")
queue()
    .defer(d3.csv, "https://data.jhkforecasts.com/2020-presidential.csv")
    .defer(d3.csv, "https://data.jhkforecasts.com/2020-senate.csv")
    .defer(d3.csv, "https://data.jhkforecasts.com/2020-house.csv")
    .defer(d3.csv, "https://jhkforecasts.com/pageLinks.csv")
    .await(ready);

function ready(error, pres, senate, house, data) {
    
    var trumpWin = +pres[pres.length - 3].win
    var senateRepWin = +senate[senate.length - 2].win
    var houseRepWin = +house[house.length - 1].repWin
    console.log(houseRepWin)

    var footer = d3.select("#home")
        .append("svg")
        .attr("viewBox", "0 0 1000 80")
    var footer = d3.select("#footer")
        .append("svg")
        .attr("viewBox", "0 0 1000 80")

    footer.append("a").attr("href","https://projects.jhkforecasts.com/presidential-forecast/").append("image")
        .attr("href", trumpWin >= 50 ? "https://jhkforecasts.com/Trump-01.png" : "https://jhkforecasts.com/Biden-01.png")
        .attr("x", 230)
        .attr("y", 30)
        .attr("height", 50)
        .attr("width", 50)

    footer.append("a").attr("href","https://projects.jhkforecasts.com/presidential-forecast/").append("text")
        .text("Win Presidency")
        .attr("x", 280)
        .attr("y", 20)
        .attr("text-anchor", "middle")

    footer.append("a").attr("href","https://projects.jhkforecasts.com/presidential-forecast/").append("text")
        .text(trumpWin >= 50 ? "TRUMP" : "BIDEN")
        .attr("x", 290)
        .attr("y", 50)
        .attr("text-anchor", "start")

    footer.append("a").attr("href","https://projects.jhkforecasts.com/presidential-forecast/").append("text")
        .text(trumpWin >= 50 ? nf(trumpWin) + "%" : nf(100 - trumpWin) + "%")
        .attr("x", 290)
        .attr("y", 70)
        .attr("text-anchor", "start")


    footer.append("a").attr("href","https://projects.jhkforecasts.com/senate-forecast/").append("image")
        .attr("href", senateRepWin >= 50 ? "https://jhkforecasts.com/elephant-01.png" : "https://jhkforecasts.com/donkey-01.png")
        .attr("x", 530)
        .attr("y", 30)
        .attr("height", 50)
        .attr("width", 50)

    footer.append("a").attr("href","https://projects.jhkforecasts.com/senate-forecast/").append("text")
        .text("Win SEnate")
        .attr("x", 580)
        .attr("y", 20)
        .attr("text-anchor", "middle")

    footer.append("a").attr("href","https://projects.jhkforecasts.com/senate-forecast/").append("text")
        .text(senateRepWin >= 50 ? "GOP" : "DEM")
        .attr("x", 590)
        .attr("y", 50)
        .attr("text-anchor", "start")
    footer.append("a").attr("href","https://projects.jhkforecasts.com/senate-forecast/").append("text")
        .text(senateRepWin >= 50 ? nf(senateRepWin) + "%" : nf(100 - senateRepWin) + "%")
        .attr("x", 590)
        .attr("y", 70)
        .attr("text-anchor", "start")

    footer.append("a").attr("href","https://projects.jhkforecasts.com/house-forecast/").append("image")
        .attr("href", houseRepWin >= 50 ? "https://jhkforecasts.com/elephant-01.png" : "https://jhkforecasts.com/donkey-01.png")
        .attr("x", 830)
        .attr("y", 30)
        .attr("height", 50)
        .attr("width", 50)

    footer.append("a").attr("href","https://projects.jhkforecasts.com/house-forecast/").append("text")
        .text("Win HOuse")
        .attr("x", 880)
        .attr("y", 20)
        .attr("text-anchor", "middle")

    footer.append("a").attr("href","https://projects.jhkforecasts.com/house-forecast/").append("text")
        .text(houseRepWin >= 50 ? "GOP" : "DEM")
        .attr("x", 890)
        .attr("y", 50)
        .attr("text-anchor", "start")
    footer.append("a").attr("href","https://projects.jhkforecasts.com/house-forecast/").append("text")
        .text(houseRepWin >= 50 ? nf(houseRepWin) + "%" : nf(100 - houseRepWin) + "%")
        .attr("x", 890)
        .attr("y", 70)
        .attr("text-anchor", "start")

    footer.append("text")
        .text("FORECASTS")
        .attr("x", 20)
        .attr("y", 45)
        .attr("text-anchor", "start")
}