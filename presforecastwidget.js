var glines
var mouseG
var tooltip
var parseDate = d3.timeParse("%Y-%m-%d %H:%M:%S")
var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]

var margin = { top: 20, right: 20, bottom: 0, left: 40 }
var width6 = 1200 - margin.left - margin.right
var height6 = 600 - margin.top - margin.bottom

var lineOpacity = 1
var lineStroke = "8px"

var axisPad = 12 // axis formatting
var R = 7 //legend marker

var category = ["Trump", "Democrats", "3rd Party"]
// since Category B and E are really close to each other, assign them diverging colors
var colorScale = d3.scaleOrdinal()
  .domain(category)
  .range(["#FF6060", "#0091FF", "#FFE130"])

d3.csv("https://raw.githubusercontent.com/jhkersting/jhkforecasts/master/presidential_forecast/timechange.csv", function (error, data) {

  var data = data.filter(function (d) { return d.state == 'US'; })

  var data = data.filter(function (d) { return d.index == 'win'; })

  var dataArray = [data.percentage]
  var res = data.map((d, i) => {
    return {
      date: parseDate(d.date),
      dataPoint: +d.dataPoint,
      candidate: d.candidate,
      percentage: +d.percentage
    }
  })
  console.log(dataArray)


  var mindate = new Date(),
    maxdate = new Date();

    window.onload=function(){
      var today = new Date();
      var newdate = new Date();
      newdate.setDate(today.getDate()-30);
      this.console.log(newdate);
  

  var maxYVal = Math.round(d3.max(data, d => d.percentage));

  var test = 100
  console.log(maxYVal);

  var maxYValu = Math.round(maxYVal / 10) * 10 + 10


  var maxYValue = maxYValu > 100 ? 100 : maxYValu;

  console.log(maxYValue);
  var xScale = d3.scaleTime()
    .domain([newdate, mindate])
    .range([0, width6])



  var yScale = d3.scaleLinear()
    .range([height6, 0]);

  var svg = d3.select("#preswidg").append("svg")
    .attr("viewBox", '40 0 1100 600')
    .append('g')
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  // CREATE AXES // 
  // render axis first before lines so that lines will overlay the horizontal ticks
  var xAxis = d3.axisBottom(xScale)
  var yAxis = svg.append("g")
    .attr("class", "myYaxis")
  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0, ${height6})`)
    .call(xAxis.ticks(4)
      .tickFormat(d3.timeFormat("%b")))
    .call(g => {
      var years = xScale.ticks(d3.timeYear.every(1))
      var xshift = 0
      g.selectAll("text")
        .style("text-anchor", "right")
        .attr("y", axisPad)
        .attr('fill', 'black')
        .attr('font-size', '25')
        .attr('font-weight', 700)
      g.selectAll("line").remove()


      g.select(".domain")
        .remove()

    })




  // CREATE LEGEND // 


  // line generator

  var line = d3.line()
    .curve(d3.curveCatmullRom)
    .x(d => xScale(d.date))
    .y(d => yScale(d.percentage))

  renderChart(1) // inital chart render (set default to Bidding Exercise 1 data)

  // Update chart when radio button is selected
  d3.selectAll(("input[name='dataPoint']")).on('change', function () {
    updateChart(this.value)
  })

  function updateChart(dataPoint) {
    var resNew = res.filter(d => d.dataPoint == parseInt(dataPoint))

    var maxYVal = Math.round(d3.max(resNew, d => d.percentage));

    var test = 100
    console.log(maxYVal);

    var maxYValu = dataPoint == 1 ? 100 : Math.round(maxYVal / 10) * 10 + 10

    yScale.domain([0, maxYValu])
    yAxis.transition().duration(1000).call(d3.axisLeft(yScale).ticks(5)).call(g => {
      g.selectAll("text")
        .style("text-anchor", "end")
        .attr('fill', 'black')
        .attr('font-size', '25')
        .attr('font-weight', 700)

      g.selectAll("line")
        .attr('stroke', '#A9A9A9')
        .attr('stroke-width', 0.7) // make horizontal tick thinner and lighter so that line paths can stand out
        .attr('opacity', 0)

      g.select(".domain")
        .attr('stroke', '#A9A9A9')
        .attr('stroke-width', 0.7) // make horizontal tick thinner and lighter so that line paths can stand out
        .attr('opacity', 0)
    })

    var resNew = res.filter(d => d.dataPoint == parseInt(dataPoint))

    var res_nested = d3.nest()
      .key(d => d.candidate)
      .entries(resNew)

    glines.select('.line') //select line path within line-group (which represents a vehicle category), then bind new data 
      .data(res_nested)
      .transition().duration(1000)
      .attr('d', function (d) {
        return line(d.values)
      })

    mouseG.selectAll('.mouse-per-line')
      .data(res_nested)

    mouseG.on('mousemove', function () {
      var mouse = d3.mouse(this)
      updateTooltipContent(mouse, res_nested)
    })
  }

  function renderChart(dataPoint) {

    var resNew = res.filter(d => d.dataPoint == parseInt(dataPoint))

    var maxYVal = Math.round(d3.max(resNew, d => d.percentage));

    var test = 100
    console.log(maxYVal);

    var maxYValu = dataPoint == 1 ? 100 : Math.round(maxYVal / 10) * 10 + 10

    yScale.domain([0, maxYValu])
    yAxis.transition().duration(1000).call(d3.axisLeft(yScale).ticks(5)).call(g => {
      g.selectAll("text")
        .style("text-anchor", "end")
        .attr('fill', 'black')
        .attr('font-size', '25')
        .attr('font-weight', 700)

      g.selectAll("line")
        .attr('stroke', '#A9A9A9')
        .attr('stroke-width', 0.7) // make horizontal tick thinner and lighter so that line paths can stand out
        .attr('opacity', 0)

      g.select(".domain")
        .attr('stroke', '#A9A9A9')
        .attr('stroke-width', 0.7) // make horizontal tick thinner and lighter so that line paths can stand out
        .attr('opacity', 0)

    });
    var res_nested = d3.nest() // necessary to nest data so that keys represent each vehicle category
      .key(d => d.candidate)
      .entries(resNew)

    // APPEND MULTIPLE LINES //
    var lines = svg.append('g')
      .attr('class', 'lines')

    glines = lines.selectAll('.line-group')
      .data(res_nested).enter()
      .append('g')
      .attr('class', 'line-group')

    glines
      .append('path')
      .attr('class', 'line')
      .attr('d', d => line(d.values))
      .style('stroke', (d, i) => colorScale(i))
      .style('fill', 'none')
      .style('opacity', lineOpacity)
      .style('stroke-width', lineStroke)


    // APPEND CIRCLE MARKERS //
    //var gcircle = lines.selectAll("circle-group")
    //.data(res_nested).enter()
    //.append("g")
    //.attr('class', 'circle-group')

    //gcircle.selectAll("circle")
    //.data(d => d.values).enter()
    //.append("g")
    //.attr("class", "circle")  
    //.append("circle")
    //.attr("cx", d => xScale(d.date))
    //.attr("cy", d => yScale(d.percentage))
    //.attr("r", 2)

    // CREATE HOVER TOOLTIP WITH VERTICAL LINE //
    

  }
    }
})   