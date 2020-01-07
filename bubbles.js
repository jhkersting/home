d3.csv("https://raw.githubusercontent.com/jhkersting/jhkforecasts/master/democratic_primary/bubbles.csv", function(error, data){
        
  var data = data.filter(function(d){return d.state == 'US';})

var res = data.map((d,i) => {
  return {
    candidate : +d.candidate,
    win : +d.win,
    vote :+d.vote,
    delegates:+d.delegates,
    color : +d.color,
    cx : +d.cx,
    cy : +d.cy,

  }
})

//Create the SVG Viewport
var svgContainer = d3.select("#bubbles").append("svg")
.attr("viewBox", "0 0 1100 600");
 
//Add circles to the svgContainer

var colorScale = d3.scaleLinear()
      .domain([0,10,100])
        .range(["white" ,"#0091FF","#002E66"])

var colorScale2 = d3.scaleLinear()
        .domain([0,10,40])
          .range(["white" ,"#0091FF","#002E66"])

          var colorScale3 = d3.scaleLinear()
          .domain([0,100,1889])
            .range(["white" ,"#0091FF","#002E66"])
 


var circles = svgContainer.selectAll("circle")
                            .data(data)
                            .enter()
                            .append("circle");

var text = svgContainer.selectAll("text")
                     .data(data)
                     .enter()
                      .append("text")
                      .attr("text-anchor","middle");
var textZero = svgContainer.selectAll("textZero")
                     .data(data)
                     .enter()
                      .append("text")
                      .attr("text-anchor","middle");

var textTwo = svgContainer.selectAll("textTwo")
                     .data(data)
                     .enter()
                      .append("text")
                      .attr("text-anchor","middle");

 //Add the circle attributes
var circleAttributes = circles
                        .attr("cx", function (d) { return d.cx; })
                        .attr("cy", 125)
                       .attr("r", 50)
                     .style("fill", d => colorScale(d.win))
                     .style('opacity', .7);
  
  var textLabels = text
               .attr("x", function(d) { return d.cx; })
              .attr("y", 150)
              .text( d=> d.win +"%")
               .attr("font-family", "sans-serif")
              .attr("font-size", "20px")
               .attr("fill", "black");

var textLabelsTwo = textTwo
               .attr("x", function(d) { return d.cx; })
              .attr("y", 125)
              .text( function (d) { return d.candidate; })
               .attr("font-family", "sans-serif")
              .attr("font-size", "20px")
               .attr("fill", "black")
               ;
var textLabelsZero = textZero
               .attr("x", 550)
              .attr("y", 50)
              .text("Win Nomination")
               .attr("font-family", "sans-serif")
              .attr("font-size", "45px")
               .attr("fill", "black");




//Add circles to the svgContainer
var circlesTwo = svgContainer.selectAll("circlesTwo")
                            .data(data)
                            .enter()
                            .append("circle");

var textThree = svgContainer.selectAll("textThree")
                     .data(data)
                     .enter()
                      .append("text")
                      .attr("text-anchor","middle");

var textFour = svgContainer.selectAll("textFour")
                     .data(data)
                     .enter()
                      .append("text")
                      .attr("text-anchor","middle");
var textFive = svgContainer.selectAll("textFive")
                     .data(data)
                     .enter()
                      .append("text")
                      .attr("text-anchor","middle");


 //Add the circle attributes
var circleAttributesTwo = circlesTwo
                        .attr("cx", function (d) { return d.cx; })
                        .attr("cy", 300)
                       .attr("r", 50)
                     .style("fill", d => colorScale2(d.vote))
                     .style('opacity', .7);
  
  var textLabelsThree = textThree
               .attr("x", function(d) { return d.cx; })
              .attr("y", 325)
              .text( d => d.vote+"%")
               .attr("font-family", "sans-serif")
              .attr("font-size", "20px")
               .attr("fill", "black");

var textLabelsFour = textFour
               .attr("x", function(d) { return d.cx; })
              .attr("y", 300)
              .text( function (d) { return d.candidate; })
               .attr("font-family", "sans-serif")
              .attr("font-size", "20px")
               .attr("fill", "black")
               ;

var textLabelsFive = textFive
               .attr("x", 550)
              .attr("y", 225)
              .text("Vote Share")
               .attr("font-family", "sans-serif")
              .attr("font-size", "45px")
               .attr("fill", "black");

        //Add circles to the svgContainer
var circlesThree = svgContainer.selectAll("circlesThree")
                            .data(data)
                            .enter()
                            .append("circle");

var textSix = svgContainer.selectAll("textSix")
                     .data(data)
                     .enter()
                      .append("text")
                      .attr("text-anchor","middle");

var textSeven = svgContainer.selectAll("textSeven")
                     .data(data)
                     .enter()
                      .append("text")
                      .attr("text-anchor","middle");
var textEight = svgContainer.selectAll("textEight")
                     .data(data)
                     .enter()
                      .append("text")
                      .attr("text-anchor","middle");


 //Add the circle attributes
var circleAttributesThree = circlesThree
                        .attr("cx", function (d) { return d.cx; })
                        .attr("cy", 475)
                       .attr("r", 50)
                     .style("fill", d=> colorScale3(d.delegates))
                     .style('opacity', .7);
  
  var textLabelsSix = textSix
               .attr("x", function(d) { return d.cx; })
              .attr("y", 500)
              .text( function (d) { return d.delegates; })
               .attr("font-family", "sans-serif")
              .attr("font-size", "20px")
               .attr("fill", "black");

var textLabelsSeven = textSeven
               .attr("x", function(d) { return d.cx; })
              .attr("y", 475)
              .text( function (d) { return d.candidate; })
               .attr("font-family", "sans-serif")
              .attr("font-size", "20px")
               .attr("fill", "black")
               ;

var textLabelsEight = textEight
               .attr("x", 550)
              .attr("y", 400)
              .text("Projected Delegates")
               .attr("font-family", "sans-serif")
              .attr("font-size", "45px")
               .attr("fill", "black");

})