var candidates = ["Biden", "Bloomberg", "Booker", "Buttigieg", "Klobuchar", "Sanders", "Steyer", "Warren", "Yang","No one"]

var color = d3.scaleOrdinal()
  .domain(candidates)
  .range(["#00C181", "#FF6060", "#a4b1b5", "#FFC000", "#FF8D32", "#0091FF", "#FF2EF0", "#CD64FF", "#0070C0","#7D7E81"])
d3.csv("https://raw.githubusercontent.com/jhkersting/jhkforecasts/master/democratic_primary/topline.csv", function (error, data) {
  data.sort((a, b) => b.delegates - a.delegates)
  data.sort((a, b) => b.majority - a.majority)
  console.log(data)
  var max_win = data[0].majority

  var x = d3.scaleLinear()
    .domain([0, max_win])
    .range([100, 430])




  var svg = d3.select("#demprim").append("svg")
    .attr("viewBox", "0 0 500 430")
    .append('g')

  var svgrepeat = svg.append('g')
    .attr("transform", "translate(" + 0 + "," + 50 + ")")

  var repeat = svgrepeat.selectAll('.repeat')
    .data(data)
    .enter()
    .append('g')
    .attr("transform", function (d, i) { return "translate(0," + i * 80 + ")" })





  repeat.append("image")
    .attr("xlink:href", d => d.candidate + "-01.png")
    .attr("height", 60)
    .attr("width", 60)
    .attr("x", d => x(d.majority) + 5)
    .attr("y", 0)
    

  repeat.append("text")
    .attr("class", "repeat-text")
    .attr("x", 95)
    .attr("y", 40)
    .style("fill", (d,i) => color(d.candidate))
    .style("font-size", 30)
    .attr("font-weight", 700)
    .text(d => d.majority + "%")
    .attr("text-anchor", "end")

  repeat.append("rect")
    .attr("x", 100)
    .attr("y", 5)
    .style("fill", d => color(d.candidate))
    .attr("width", d => x(d.majority) - 100)
    .attr("height", 50)
    
  svg.append("text")
    .attr("x", 250)
    .attr("y", 25)
    .style("fill", "Black")
    .style("font-size", 20)
    .attr("font-weight", 700)
    .attr("text-anchor", "end")
    .attr("text-anchor", "middle")
    .text("Win Nomination")

  svg.append("line")
    .attr("x1", 10)
    .attr("x2", 480)
    .attr("y1", 35)
    .attr("y2", 35)
    .attr("stroke", "black")
    .attr("stroke-width", 3)
})