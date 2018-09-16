var w = 600;
var h = 400;
var w2 = 600;
var h2 = 50;
var barPadding = 5;

var who ;
var data1 = [];
var year = [];

$("#players li").click(function() {
    d3.select("svg").remove();
    d3.select("p").remove();

    data1.length = 0;
    year.length = 0;
    var player = $(this).text(); // gets text contents of clicked li
    who = player;

for (var i = 0; i < 92; i++) {
  if(Player[i].Name == who) {
    var match = Player[i];
    var matchedGoals = match.Goals;
    var season = match.Season;
    data1.push(matchedGoals);
    year.push(season);
  }
};
document.getElementById("output").innerHTML = who;

var svg = d3.select("#output")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

      svg.selectAll("rect")
         .data(data1)
         .enter()
         .append("rect")
         .attr("x", function(d, i) {
            return i * (w / data1.length);
         })
         .attr("y", function(d) {
            return h - (d * 8);
         })
         .attr("width", w / data1.length - barPadding)
         .attr("height", function(d) {
            return d * 8;
         }).transition()
        .delay(function (d, i) { return i*100; })
         .attr("fill", "#3D90FF");


      svg.selectAll("text")
         .data(data1)
         .enter()
         .append("text")
         .text(function(d) {
            return d;
         })
         .attr("text-anchor", "middle")
         .attr("x", function(d, i) {
            return i * (w / data1.length) + (w / data1.length - barPadding) / 2;
         })
         .attr("y", function(d) {
            return h - (d * 7.75) + 14;
         })
         .attr("font-family", "sans-serif")
         .attr("font-size", "14px")
         .attr("fill", "white");


console.log(data1);
console.log(year);

var svg = d3.select("#labels")
            .append("p")
            .attr("width", w2)
            .attr("height", h2);

      svg.selectAll("text1")
         .data(year)
         .enter()
         .append("text")
         .text(function(d) {
            return d;
         })
         .attr("text-anchor", "middle")
         .attr("x", function(d, i) {
            return i * (w / data1.length) + (w / data1.length - barPadding) / 2;
         })
         .attr("y", function(d) {
            50;
         })
         .attr("font-family", "sans-serif")
         .attr("font-size", "14px")
         .attr("fill", "white");
});

