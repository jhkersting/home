var nf = d3.format(".1f")
queue()
    .defer(d3.csv, "links.csv")
    .await(ready);

function ready(error, photos) {


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

    d3.select("#footer").style("display", "block")

}