var nf = d3.format(".1f")
var dp = d3.timeParse("%m/%d/%y")
d3.csv("https://output.jhkforecasts.com/2020-senate.csv", data => {
    console.log(date)

    var sencomp = d3.select("#senate-comp")
        .append("svg")
        .attr("viewBox", "0 0 300 300")

    sencomp.append("line")
        .attr("x1", 12.5)
        .attr("x2", 287.5)
        .attr("y1", 45.5)
        .attr("y2", 45.5)
        .attr("stroke", "black")

})