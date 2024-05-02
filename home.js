var nf = d3.format(".1f")
var zf = d3.format(".0f")
var ov = d3.format(".1f")
var margin_scale = d3.scaleLinear()
    .domain([-100, -50, -35, -10, 0, 10, 35, 50, 100])
    .range(["#4169D8", "#4169D8", "#339AFF", "#99D3FF", "white", "#FFB9BA", "#FF6666", "#DC3B3E", "#DC3B3E"]);
function party_ov(x) {
    if (+x > 0) {
        return "R+" + ov(x)
    }
    else if (+x < 0) {
        return "D+" + ov(-x)
    }
    else {
        return "E"
    }
}

function party_zv(x) {
    if (+x > 0) {
        return "R+" + zf(x)
    }
    else if (+x < 0) {
        return "D+" + zf(-x)
    }
    else {
        return "E"
    }
}

queue()
    .defer(d3.csv, "links.csv")
    .defer(d3.csv, "https://data.jhkforecasts.com/2024-president/polling/current-margins.csv")

    .await(ready);

function ready(error, photos,pres_polling) {

   

    var home = d3.select("#homeComputer")

    states = ["Alabama", "Arizona", "Florida", "Georgia", "Iowa", "Michigan", "Minnesota", "Nevada", "New Hampshire", "North Carolina", "Ohio", "Pennsylvania", "Texas", "Wisconsin", "US"]
    abbrevs = ["AL", "AZ", "FL", "GA", "IA", "MI", "MN", "NV", "NH", "NC", "OH", "PA", "TX", "WI", "US"]

    averages = pres_polling.filter(d => states.includes(d.state))
    averages.sort((a, b) => a.margin - b.margin)

    const header = home.append("div")
        .style("width", "100%")
        .style("padding", "10px")
        .style("margin", "0px")
        .style("font-size", "20px")
        .style("font-weight", "bold")
        .append('p')
        .text("2024 Pres.Polling Averages")
        .style("text-align", "center")


    const table = home.append("table").style("width", "100%")
            .style("border-collapse", "collapse")
            .style("border-radius", "10px")
            .style("border", "black solid 1px")

    const row = table.append("tr")
    .style("width", "100%")
    const row2 = table.append("tr")

    averages.forEach((d,i) => {
        abbrev = abbrevs[states.indexOf(d.state)]
        d.url_link = d.state.split(" ").join("-").toLowerCase()
        row.append("td")
            .style("border-left", "black solid 1px")
            .style("border-right", "black solid 1px")
            .style("padding", "5px")
            .style("text-align", "center")
            .style("font-size", "12px")
            .style("font-weight", "600")
            .style('width',(100/averages.length) + "%")
            .style("padding", "0px")
            .style("margin", "0px")
            .on("click", () => {
                window.location.href = "https://projects.jhkforecasts.com/2024/president/polling.html#" + d.url_link
            })
            .style("cursor", "pointer")
            .append('p')
            .text(abbrev)
            .style("padding", "10px 0px")
            .style("margin", "0px")
            .style("font-weight",d.state == "US" ? "800" : "400")

        row2.append("td")
            .style("border-left", "black solid 1px")
            .style("border-right", "black solid 1px")
            .style("padding", "5px")
            .style("text-align", "center")
            .style("font-size", "12px")
            .style('width',(100/averages.length) + "%")
            .style("padding", "0px")
            .style("margin", "0px")
            .on("click", () => {
                window.location.href = "https://projects.jhkforecasts.com/2024/president/polling.html#" + url_link
            })
            .style("cursor", "pointer")
            .append('p')
            .text(party_ov(d.margin*100))
            .style("background-color", margin_scale(d.margin * 100))
            .style("padding", "10px 0px")
            .style("margin", "0px")
            .style("font-weight", d.state == "US" ? "800" : "400")
    })

    


    console.log(averages)

    home.selectAll("imgs")
        .data(photos)
        .enter()
        .append("a")
        .attr("href", d => d.link)
        .append("img")
        .attr("src", d => d.photo_src + "-01.svg")
        .style("width", "100%")
        .style("border", "black solid 1px")
        .style("border-radius", "10px")
        .style("margin-top", "5px")

    var homePhone = d3.select("#homePhone")

    homePhone.selectAll("imgs")
        .data(photos)
        .enter()
        .append("a")
        .attr("href", d => d.link)
        .append("img")
        .attr("src", d => d.photo_src + "-02.svg")
        .style("width", "100%")
        .style("border", "black solid 1px")
        .style("border-radius", "20px")
        .style("margin-top", "10px")

    


}