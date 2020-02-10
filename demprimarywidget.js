var winscale = d3.scaleLinear()
  .domain([0, 50,100])
  .range(["white", "#0091FF", "#002E66"]);
var delscale = d3.scaleLinear()
  .domain([0, 1990])
  .range(["white", "#002E66"]);  

  var category = ["Biden", "Bloomberg", "Booker", "Buttigieg", "Klobuchar", "Sanders", "Steyer", "Warren", "Yang"]
  // since Category B and E are really close to each other, assign them diverging colors
  var color = d3.scaleOrdinal()
    .domain(category)
    .range(["#00FF90", "#FF6060", "#a4b1b5", "#FFC000", "#99D3FF", "#0091FF", "#EBBFFF", "#AF0BFF", "#00C181"])
  

d3.csv("https://raw.githubusercontent.com/jhkersting/jhkforecasts/master/democratic_primary/topline.csv", function (error, data) {

  data.sort((a,b)=> b.win - a.win)


  var svg = d3.select("#demprim").append("svg")
    .attr("viewBox", "0 0 500 400")
    .append('g')

  
svg.append("rect")
.attr("width",500)
.attr("height",500)
.attr("fill","white")

  var svgrepeat = svg.append('g')
    .attr('class', 'grepeat')
    .attr("transform", "translate(" + 0 + "," + 80 + ")")



  var repeat = svgrepeat.selectAll('.repeat')
    .data(data)
    .enter().append('g')
    .attr("class", "repeat")
    .attr("transform", function (d, i) { return "translate(0," + i * 80 + ")" })


    

  repeat.append("image")
    .attr("xlink:href",  d=>d.candidate+".jpg")
    .attr("x", 20)
    .attr("y", 0)
    .attr("height", 60)
    
    repeat.append("text")
    .attr("class", "repeat-text")
    .attr("x", 315)
    .attr("y", 30)
    .style("fill", d=>color(d.candidate))
    .style("font-size", 30)
    .attr("font-weight", 700)
    .text(d => d.win+"%")
    .attr("text-anchor", "end")

    repeat.append("text")
    .attr("class", "repeat-text")
    .attr("x", 475)
    .attr("y", 30)
    .style("fill",d=>color(d.candidate))
    .style("font-size", 30)
    .attr("font-weight", 700)
    .text(d => d.delegates)
    .attr("text-anchor", "end")
    
    

    svg.append("text")
    .attr("x",20)
    .attr("y",55)
    .style("fill", "Black")
    .style("font-size", 25)
    .attr("font-weight",700)
    .text("Candidate")

    svg.append("text")
    .attr("x",430)
    .attr("y",55)
    .style("fill", "Black")
    .style("font-size", 20)
    .attr("font-weight",700)
    .attr("text-anchor","end")
    .text("Delegates")
    .attr("text-anchor","middle")

    svg.append("text")
    .attr("x",270)
    .attr("y",30)
    .style("fill", "Black")
    .style("font-size", 20)
    .attr("font-weight",700)
    .attr("text-anchor","end")
    .attr("text-anchor","middle")
    .text("Win")
    
    svg.append("text")
    .attr("x",270)
    .attr("y",55)
    .style("fill", "Black")
    .style("font-size", 20)
    .attr("font-weight",700)
    .attr("text-anchor","middle")
    .text("Nomination")

    svg.append("line")
    .attr("x1",10)
    .attr("x2",480)
    .attr("y1",65)
    .attr("y2",65)
    .attr("stroke","black")
    .attr("stroke-width",3)
})