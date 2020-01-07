var delegateScale = d3.scaleLinear()
  .domain([0, .50,1])
  .range(["white", "#0091FF", "#002E66"]);



d3.csv("delegates.csv", function (error, data) {

  


  var svg = d3.select("#demprim").append("svg")
    .attr("viewBox", "-50 0 1050 3500")
    .append('g')

  


  var svgLegend = svg.append('g')
    .attr('class', 'gLegend')
    .attr("transform", "translate(" + 0 + "," + 90 + ")")



  var legend = svgLegend.selectAll('.legend')
    .data(data)
    .enter().append('g')
    .attr("class", "legend")
    .attr("transform", function (d, i) { return "translate(0," + i * 40 + ")" })



  legend.append("text")
    .attr("class", "legend-text")
    .attr("x", 20)
    .attr("y", -5)
    .style("fill", "Black")
    .style("font-size", 15)
    .attr("font-weight", 500)
    .text(d => d.date)
    .attr("text-anchor", "start")

})