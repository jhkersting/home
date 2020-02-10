d3.csv("https://raw.githubusercontent.com/jhkersting/jhkforecasts/master/democratic_primary/bubblemap.csv", function (error, data) {
var svg = d3.select("#demprimsim")
        .append("svg")
        .attr("viewBox","0 0 660 445")

function circleTransition() { 




    var margin2 = { top: 0, right: 70, bottom: 0, left: 50 }
var width2 = 860 - margin2.left - margin2.right
var height2 = 445
var axisPad = 12
var R =7


var colors = ["#00FF90", "#00B050", "#98d2f8", "#0077FF", "#002E66", "#E7B5FF", "#B722FF", "purple"]
var category = ["Biden", "Bloomberg", "Booker", "Buttigieg", "Klobuchar", "Sanders", "Steyer", "Warren", "Yang"]
// since Category B and E are really close to each other, assign them diverging colors
var color = d3.scaleOrdinal()
  .domain(category)
  .range(["#00FF90", "#00B050", "#a4b1b5", "#98d2f8", "#0077FF", "#002E66", "#E7B5FF", "#B722FF", "purple"])
var colortwo = d3.scaleOrdinal()
  .domain(category)
  .range(["black", "white", "white", "black", "white", "white", "black", "white", "white"])


var div = d3.select("#bubblemap").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);








  var x = d3.scaleLinear()
    .domain([0, 780])
    .range([0, width2])



  var y = d3.scaleLinear()
    .domain([0, 445])
    .range([0, height2]);



  
    


  svg.selectAll("label")
    .data(data)
    .enter()
    .append("text")
    .text(d => d.abbrev)
    .attr("x", d => x(d.xValue))
    .attr("y", d => y(d.yValue) + 3)
    .attr("text-anchor", "middle")
    .attr("font-family", "brandon-grotesque")
    .attr("font-weight", 700)
    .attr("font-size", "8")
    .attr("fill","black")

 


    var timeCircle = svg.selectAll("states")
    .data(data)
    .enter()
    .append("circle")
    .attr('fill', "white")  
    .attr("cx", d => x(d.xValue))
    .attr("cy", d => y(d.yValue))
    .attr("r", d => d.radius);
    repeat();
    
    function repeat() {
      timeCircle  
        .transition()        // apply a transition
        .duration(300) 
        .delay(function(d,i){return 40*i})      // apply it over 2000 milliseconds
        .attr('fill', colors[Math.round(Math.random()*8)]) 
        .transition() 
        .duration(300) 
        .delay(1000)      // apply it over 2000 milliseconds
        .attr('fill', "white")    // move the circle to 920 on the x axis
        .transition()        // apply a transition
        .duration(300) 
        .delay(1000)    // apply it over 2000 milliseconds
        .attr('fill', colors[Math.round(Math.random()*8)])
        .transition() 
        .duration(300) 
        .delay(1000)      // apply it over 2000 milliseconds
        .attr('fill', "white")      // return the circle to 40 on the x axis
        .on("end", repeat);  // when the transition finishes start again
    
    };
    svg.selectAll("label")
    .data(data)
    .enter()
    .append("text")
    .text(d => d.abbrev)
    .attr("x", d => x(d.xValue))
    .attr("y", d => y(d.yValue) + 3)
    .attr("text-anchor", "middle")
    .attr("font-family", "brandon-grotesque")
    .attr("font-weight", 700)
    .attr("font-size", "8")
    .attr("fill","black")

};

circleTransition();

})