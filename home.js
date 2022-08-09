var nf = d3.format(".1f")
var zf = d3.format(".0f")
queue()
    .defer(d3.csv, "links.csv")
    .defer(d3.csv,"https://data.jhkforecasts.com/2022-house/today-output.csv")
    .defer(d3.csv,"https://data.jhkforecasts.com/2022-senate/today-output.csv")
    .await(ready);

function ready(error, photos,house,senate) {

    senate = senate.pop()
    house = house.pop()

    console.log(senate)

    $("#dem_win_senate").text(nf(senate.dem_win)+"%")
    $("#rep_win_senate").text(nf(senate.rep_win)+"%")
    $("#dem_win_house").text(nf(house.dem_win)+"%")
    $("#rep_win_house").text(nf(house.rep_win)+"%")

    $("#dem_win_senate_p").text(zf(senate.dem_win)+"%")
    $("#rep_win_senate_p").text(zf(senate.rep_win)+"%")
    $("#dem_win_house_p").text(zf(house.dem_win)+"%")
    $("#rep_win_house_p").text(zf(house.rep_win)+"%")

    var home = d3.select("#homeComputer")

    home.selectAll("imgs")
        .data(photos)
        .enter()
        .append("a")
        .attr("href", d => d.link)
        .append("img")
        .attr("src", d => d.photo_src + "-01.svg")
        .style("width", "100%")
        .style("border", "black solid 1px")
        .style("border-radius", "20px")
        .style("margin-top", "10px")

    var homePhone = d3.select("#homePhone")

    homePhone.selectAll("imgs")
        .data(photos)
        .enter()
        .append("a")
        .attr("href", d => d.link)
        .append("img")
        .attr("src", d => d.photo_src + "-02.svg")
        .style("width", "100%")
        .style("border", "black solid 1px")
        .style("border-radius", "20px")
        .style("margin-top", "10px")


}