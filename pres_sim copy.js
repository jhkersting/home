

d3.csv("US Map.csv", function (data) {
    var width3 = 1020;
    var height3 = 500;

    var projection = d3.geoAlbersUsa()
        .translate([width3 / 2, height3 / 2])    // translate to center of screen
        .scale([900]);          // scale things down so see entire US

    var path = d3.geoPath()               // path generator that will convert GeoJSON to SVG paths
        .projection(projection);  // tell path generator to use albersUsa projection


    var color = d3.scaleLinear()
        .domain([0, 50, 100])
        .range(["#0091FF", "white", "#FF6060"]);



    var svg = d3.select("#usmapphone")
        .append("svg")
        .attr("viewBox", '100 50 820 550');



    var tool_tip = d3.tip()
        .attr("class", "d3-tip")
        .offset([-120, -30])
        .html("<div id='tipDiv'></div>");

    svg.call(tool_tip);



    d3.json("us-states.json", function (json) {

        for (var i = 0; i < data.length; i++) {

            var dataState = data[i].state;

            var gopwin = data[i].gopWin

            var demwin = data[i].demWin

            var label = data[i].label

            var xvalue = data[i].xValue

            var yvalue = data[i].yValue

            var tippingpoint = data[i].tippingPoint;

            for (var j = 0; j < json.features.length; j++) {
                var jsonState = json.features[j].properties.name;

                if (dataState == jsonState) {

                    json.features[j].properties.gopWin = gopwin
                    json.features[j].properties.tippingPoint = tippingpoint
                    json.features[j].properties.demWin = demwin
                    json.features[j].properties.xValue = xvalue
                    json.features[j].properties.yValue = yvalue
                    json.features[j].properties.label = label
                        ;

                    // Stop looking through the JSON

                    break;
                }
            }
        }
        console.log(json.features)
        console.log(data)
        var time = svg.selectAll("path")
            .data(json.features)
            .enter()
           
            .append("path")
            .attr("class", "states")
            .attr("d", path)
            .style("stroke", "#fff")
            .style("stroke-width", "1")
            .attr("fill", "white")
            .attr("text-anchor", "middle");
            repeat();

            function repeat() {
                time  
                  .transition()        
                  .duration(250) 
                  .delay((d,i)=>40*i+250)      
                  .attr('fill', "#0091FF") 
                  .transition() 
                  .duration(500) 
                  .delay(500)     
                  .attr('fill', "#FF6060") 
                  .transition() 
                  .duration(500) 
                  .delay(500)      
                  .attr('fill', "white")  
                  .on("end", repeat);  
              
              };
       
                svg.append("text")
                .text("General Election Simulator")
                .attr("x", 460)
                .attr("y", 500)
                .attr("font-family", "brandon-grotesque")
                .attr("font-weight", "700")
                .attr("font-size", 60)
                .attr("fill", "black")
                .attr("text-anchor", "middle")

             
              



        d3.csv("US Map.csv", function (error, data) {




            svg.selectAll("labels")
                .data(data)
                .enter()
                .append("text")
                .text(d => d.label)
                .attr("x", d => d.xValue)
                .attr("y", d => d.yValue)
                .attr("font-family", "brandon-grotesque")
                .attr("font-weight", "700")
                .attr("font-size", "10")
                .attr("fill", "black")
                .attr("text-anchor", "middle")


        });
    });
});