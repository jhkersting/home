d3.csv("https://jhkforecasts.com/pageLinks.csv", data => {
    console.log(data)
    var home = d3.select("#home")
        .append("table")
        .append("tbody")

    var homePhone = d3.select("#homePhone")
        .append("table")
        .append("tbody")

    home.selectAll("all")
        .data(data)
        .enter()
        .append("tr")
        .attr("id", (d, i) => "row" + i)
        .attr("width", "100%")

    homePhone.selectAll("all")
        .data(data)
        .enter()
        .append("tr")
        .attr("id", (d, i) => "rowPhone" + i)
        .attr("width", "100%")


    for (let a = 0; a < data.length; a++) {
        var rowID = "row" + a
        var rowData = data[a]
        var rowAppend = d3.select("#" + rowID)
        var rowIDPhone = "rowPhone" + a
        var rowAppendPhone = d3.select("#" + rowIDPhone)

        rowAppend.append("td")
            .attr("width", "50%")
            .append("img")
            .attr("src", rowData.photoLink)
            .attr("width", "100%")

        rowAppendPhone.append("td")
            .attr("width", "50%")
            .append("img")
            .attr("src", rowData.photoLink)
            .attr("width", "100%")

        rowAppend.append("td")
            .attr("width", "50%")
            .attr("height", "50%")
            .attr("valign", "top")
            .append("h1")
            .text(rowData.description)
            .style("font-size","3vw")
            .style("font-weight",700)
            //.append("p")
            //.text(rowData.description)
            //.style("font-weight",400)
            //.style("font-size","1.5vw")



    }


})