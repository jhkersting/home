

var margin2 = { top: 0, right: 70, bottom: 0, left: 50 }
var width2 = 860 - margin2.left - margin2.right
var height2 = 445
var axisPad = 12
var R =7



var cands = ["Biden", "Bloomberg", "Booker", "Buttigieg", "Klobuchar", "Sanders", "Steyer", "Warren", "Yang"]
// since Category B and E are really close to each other, assign them diverging colors
var color = d3.scaleOrdinal()
  .domain(cands)
  .range(["#00FF90", "#00B050", "#006541", "#98d2f8", "#0077FF", "#002E66", "#E7B5FF", "#B722FF", "purple"])
var colortwo = d3.scaleOrdinal()
  .domain(cands)
  .range(["black", "white", "white", "black", "white", "white", "black", "white", "white"])


var div = d3.select("#bubblemap").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

d3.csv("https://raw.githubusercontent.com/jhkersting/jhkforecasts/master/democratic_primary/bubblemap.csv", function (error, data) {






  var x = d3.scaleLinear()
    .domain([0, 780])
    .range([0, width2])



  var y = d3.scaleLinear()
    .domain([0, 445])
    .range([0, height2]);



  var svg = d3.select("#bubblemap").append("svg")
    .attr("viewBox", '0 0 860 445')
    .append('g')
    .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

  var tool_tip = d3.tip()
    .attr("class", "d3-tip")
    .offset([-150, -30])
    .html("<div id='tipDiv'></div>");

  svg.call(tool_tip);

  var svgLegend = svg.append('g')
    .attr('class', 'gLegend')
    .attr("transform", "translate(" + 700 + "," + 30 + ")")

  var legend = svgLegend.selectAll('.legend')
    .data(cands)
    .enter().append('g')
    .attr("class", "legend")
    .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")" })

  legend.append("circle")
    .attr("class", "legend-node")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", R)
    .style("fill", d => color(d))

  legend.append("text")
    .attr("class", "legend-text")
    .attr("x", R * 2)
    .attr("y", R / 2)
    .style("fill", d => color(d))
    .style("font-size", 12)
    .style("font-weight", 500)
    .text(d => d)



  svg.selectAll("states")
    .data(data)
    .enter()
    .append("a")
    .attr("xlink:href", d => d.state + ".html")
    .append("circle")
    .attr("cx", d => x(d.xValue))
    .attr("cy", d => y(d.yValue))
    .attr("r", d => d.radius)
    .style("fill", d => color(d.first))
    


  svg.selectAll("label")
    .data(data)
    .enter()
    .append("text")
    .text(d => d.abbrev)
    .attr("x", d => x(d.xValue))
    .attr("y", d => y(d.yValue) + 3)
    .attr("text-anchor", "middle")
    .attr("font-family", "brandon-grotesque")
    .attr("font-weight", "500")
    .attr("font-size", "8")
    .attr("fill", d => colortwo(d.first))


  
  d3.csv("update.csv", function (error, data) {

    svg.selectAll("updated")
      .data(data)
      .enter()
      .append("text")
      .text(d => d.updated)
      .attr("x", 200)
      .attr("y", 20)
      .attr("fill", "black")
      .attr("font-size", 10)
      .attr("fill", "grey")
      .attr("text-anchor", "middle")
      .attr("font-weight", 900)
      .attr("text-decoration","underline")
  })
})