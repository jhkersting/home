var one_decimal = d3.format(".1f")
d3.csv("https://data.jhkforecasts.com/2020-presidential.csv",data=>{
    var data = data.slice(data.length-3,data.length)
    var results = [
        {candidate:"Trump",win:+data[0].win,vote:+data[0].vote,color:"#FF5458"},
        {candidate:"Biden",win:+data[1].win,vote:+data[1].vote,color:"#0087F9"}
    ]
    results.sort((a,b)=>b.win-a.win)
    console.log(results)

    var comp = d3.select("#pres-comp")
    .append("a")
    .attr("href","https://projects.jhkforecasts.com/presidential-forecast/")
    .append("svg")
    .attr("viewBox","0 20 300 300")
    
    comp.append("line")
    .attr("x1",12.5)
    .attr("x2",287.5)
    .attr("y1",45.5)
    .attr("y2",45.5)
    .attr("stroke","black")

    comp.selectAll("face")
    .data(results)
    .enter()
    .append("image")
    .attr("href",d=>d.candidate+"-01.png")
    .attr("height","100px")
    .attr("width","100px")
    .attr("x",12.5)
    .attr("y",(d,i)=>50+i*150)

    comp.append("text")
    .text("Win Presidency")
    .attr("x",150)
    .attr("y",35)
    .attr("font-weight",800)
    .attr("text-anchor","middle")
    .attr("dominant-baseline","central")
    .attr("font-size","12")

    comp.selectAll("face")
    .data(results)
    .enter()
    .append("text")
    .text(d=>one_decimal(d.win)+"%")
    .attr("x",187.5)
    .attr("y",(d,i)=>100+i*150)
    .attr("font-weight",700)
    .attr("text-anchor","middle")
    .attr("dominant-baseline","central")
    .attr("font-size","25")
    .attr("fill",d=>d.color)

})