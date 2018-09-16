d3.json("http://codepen.io/mloreti/pen/VLVNEX.js", function(error, data) {
  if (error) return console.warn(error);

  var w = 600;
  var h = 300;
  var padding = 30;

  var name = [];
  var goals = [];
  var seasons = ["2013/2014", "2012/2013", "2011/2012", "2010/2011"];

  data.forEach(function(d, i) {
    name.push(d.Name);
    goals.push(d.Goals);
  });

  var yScale = d3.scale.linear()
    .domain([0, (d3.max(goals))])
    .range([0, h - padding]);

  goals = [0, 0, 0, 0];

  var xScale = d3.scale.ordinal()
    .domain(d3.range(goals.length))
    .rangeRoundBands([0, w], 0.25);

  var xAxis = d3.svg.axis()
    .scale(xScale)
    .tickFormat(function(d, i) {
      return seasons[i];
    })
    .orient("bottom");

  var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");

  //Create SVG element
  var svg = d3.select("#chart")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  var uniqueNames = [];
  $.each(name, function(i, el) {
    if ($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
  });

  var players = uniqueNames.sort();

  var minY = 50;
  var maxY = 500;

  var gradient = svg
    .append("linearGradient")
    .attr("y1", minY)
    .attr("y2", maxY)
    .attr("x1", "0")
    .attr("x2", "0")
    .attr("id", "gradient")
    .attr("gradientUnits", "userSpaceOnUse")

  gradient
    .append("stop")
    .attr("offset", "0")
    .attr("stop-color", "teal")

  gradient
    .append("stop")
    .attr("offset", "1")
    .attr("stop-color", "dodgerblue")

  d3.select("#names").selectAll("li")
    .data(players)
    .enter()
    .append("li")
    .text(function(d, i) {
      return players[i];
    });

  svg.selectAll("rect")
    .data(goals)
    .enter()
    .append("rect")
    .attr("x", function(d, i) {
      return xScale(i);
    })
    .attr("y", function(d) {
      return h - yScale(d);
    })
    .attr("width", xScale.rangeBand())
    .attr("height", function(d) {
      return yScale(d);
    })
    .attr("fill", "url(#gradient)");

  svg.selectAll("text")
    .data(goals)
    .enter()
    .append("text")
    .text(function(d) {
      return d;
    })
    .attr("text-anchor", "middle")
    .attr("x", function(d, i) {
      return xScale(i) + xScale.rangeBand() / 2;
    })
    .attr("y", function(d) {
      return h - yScale(d);
    })
    .attr("class", "chartLabel");

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (h - padding) + ")")
    .call(xAxis)
    .selectAll("text")
    .attr("dy", "1em");

  //Click function //
  $("li").on("click", function(e) {
    $("li").removeClass('active');
    $(this).addClass("active");

    var clickedName = this.textContent;

    $("h1.header")[0].innerText = "Goals - " + clickedName;

    goals = [];
    seasons = [];
    data.forEach(function(d, i) {
      if (clickedName === d.Name) {
        goals.push(d.Goals);
        seasons.push(d.Season);
      };
    });

    //console.log(seasons);

    var xAxis = d3.svg.axis()
      .scale(xScale)
      .tickFormat(function(d, i) {
        return seasons[i];
      })
      .orient("bottom");

    svg.selectAll("rect")
      .data(goals)
      .transition()
      .delay(function(d, i) {
        return i / goals.length * 1000;
      })
      .duration(500)
      .attr("y", function(d) {
        return h - yScale(d) - padding;
      })
      .attr("height", function(d) {
        return yScale(d);
      })
      .attr("fill", "url(#gradient)");

    svg.selectAll("text")
      .data(goals)
      .transition()
      .delay(function(d, i) {
        return i / goals.length * 1000;
      })
      .duration(500)
      .text(function(d) {
        return d;
      })
      .attr("x", function(d, i) {
        return xScale(i) + xScale.rangeBand() / 2;
      })
      .attr("y", function(d) {
        return h - yScale(d) - (padding / 2);
      });

  }); //End li click function

});