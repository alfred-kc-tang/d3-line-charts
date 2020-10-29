// define margin and the svg windows' width and height
var margin = {top: 50, right: 150, bottom: 50, left: 150},
    width = window.innerWidth - margin.left - margin.right,
    height = window.innerHeight - margin.top - margin.bottom,
    barPadding = 5;

var svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

// add three line breaks
d3.select("body")
  .append("br")
d3.select("body")
  .append("br")
d3.select("body")
  .append("br")

// add pagebreak
d3.select("body")
  .append("div")
  .attr("class", "pagebreak");

var svg2 = d3.select("body")
             .append("svg")
             .attr("width", width + margin.left + margin.right)
             .attr("height", height + margin.top + margin.bottom)
             .append("g")
             .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

// add three line breaks
d3.select("body")
  .append("br")
d3.select("body")
  .append("br")
d3.select("body")
  .append("br")

// add pagebreak
d3.select("body")
  .append("div")
  .attr("class", "pagebreak");

var svg3 = d3.select("body").append("svg")
             .attr("width", width + margin.left + margin.right)
             .attr("height", height + margin.top + margin.bottom)
             .append("g")
             .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

// add three line breaks
d3.select("body")
  .append("br")
d3.select("body")
  .append("br")
d3.select("body")
  .append("br")

// add pagebreak
d3.select("body")
  .append("div")
  .attr("class", "pagebreak");

var svg4 = d3.select("body").append("svg")
             .attr("width", width + margin.left + margin.right)
             .attr("height", height + margin.top + margin.bottom)
             .append("g")
             .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var parseYear = d3.timeParse("%Y");

// load and parse the data
d3.dsv(",", "earthquakes.csv", function(d) {
    return {"year": parseYear(d.year),
            "5_5.9": parseInt(d["5_5.9"]),
            "6_6.9": parseInt(d["6_6.9"]),
            "7_7.9": parseInt(d["7_7.9"]),
            "8.0+": parseInt(d["8.0+"]),
            "estimated_deaths": parseInt(d["Estimated Deaths"])};
})
  .then(function(data) {
  // define x-scale
  var xScale = d3.scaleTime()
                 .domain([d3.min(data, function(data) {return data.year;}),
                          d3.max(data, function(data) {return data.year;})])
                 .range([0, width]);
  // define y-scale
  var yScale = d3.scaleLinear()
                 .domain([0, d3.max(data, function(data) {return data["5_5.9"];})])
                 .range([height, 0]);

  svg.append("g")
     .attr("class", "x-axis")
     .attr("transform", "translate(0," + height + ")")
     .call(d3.axisBottom(xScale))
     .style("font-size", "16px");

  svg.append("g")
     .attr("class", "y axis")
     .call(d3.axisLeft(yScale))
     .style("font-size", "16px");

  // create a new data structure for the data for the ease of drawing lines in colors
  var magnitude_domain = d3.keys(data[0])
                           .filter(function(key) {return key !== "year" && key !== "estimated_deaths"});

  var new_data = magnitude_domain.map(function(magnitude) {
    return {
        magnitude: magnitude,
        values: data.map(function(data) {
          return {year: data["year"],
                  number: +data[magnitude],
                  estimated_deaths: +data["estimated_deaths"]};
        })
    };
  });

  // define the specified color scheme
  var color_scheme = d3.scaleOrdinal()
                       .domain(["5_5.9", "6_6.9", "7_7.9", "8.0+"])
                       .range(["#FFC300", "#FF5733", "#C70039", "#900C3F"]);

  // define the line function for creating multiple lines
  var line = d3.line()
               .x(function(d) {return xScale(d.year);})
               .y(function(d) {return yScale(d.number);})
               .curve(d3.curveMonotoneX);

  // create multiple lines in their respective colors
  svg.selectAll(".line")
     .data(new_data)
     .enter()
     .append("path")
     .attr("class", "line")
     .attr("d", function(d) {return line(d.values);})
     .style("stroke", function(d) {return color_scheme(d.magnitude);});

  // add the legend (both the magnitude categories and their colors)
  var line_legend = svg.selectAll(".lineLegend")
                       .data(new_data)
                       .enter()
                       .append("g")
                       .attr("class", "lineLegend")
                       .attr("transform", function (d, i) {
                        return "translate(" + (width + (margin.right/6)) + "," + (i*20)+")";
                        });

  line_legend.append("text")
             .text(function (d) {return d.magnitude;})
             .attr("transform", "translate(30,10)");

  line_legend.append("rect")
             .attr("fill", function (d) {return color_scheme(d.magnitude);})
             .attr("width", 20)
             .attr("height", 10);

  // add the title
  svg.append("text")
     .attr("x", width/2)
     .attr("y", -margin.top/2)
     .style("font-size", "32px")
     .style("dx", "1em")
     .style("text-anchor", "middle")
     .text("Worldwide Earthquake stats 2000-2015");

  // add the x-axis title
  svg.append("text")
     .attr("x", width/2)
     .attr("y", (height + margin.top))
     .attr("dx", "1em")
     .style("font-size", "24px")
     .style("text-anchor", "middle")
     .text("Year");

  // add the y-axis title
  svg.append("text")
     .attr("transform", "rotate(-90)")
     .attr("x", -(height/2))
     .attr("y", -margin.left/1.5)
     .attr("dy", "1em")
     .style("font-size", "24px")
     .style("text-anchor", "middle")
     .text("Num of Earthqaukes");

  // draw the second line chart with symbols
  svg2.append("g")
      .attr("class", "x-axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale))
      .style("font-size", "16px");

  svg2.append("g")
      .attr("class", "y axis")
      .call(d3.axisLeft(yScale))
      .style("font-size", "16px");

  // define the scaleSqrt for estimated_deaths
  var sqrtScale = d3.scaleSqrt()
                    .domain([d3.min(data, function(d) {return d.estimated_deaths;}), 
                             d3.max(data, function(d) {return d.estimated_deaths;})])
                    .range([5, 15]);

  var magnitude_2 = svg2.selectAll(".magnitude")
                        .data(new_data)
                        .enter()
                        .append("g")
                        .attr("class", "magnitude");

  // create multiple lines in their respective colors
  magnitude_2.append("path")
             .attr("class", "line")
             .attr("d", function(d) {return line(d.values);})
             .style("stroke", function(d) {return color_scheme(d.magnitude);});

  // create circles of size proportional to their estimated deaths in their respective colors
  magnitude_2.selectAll("circle")
             .data(function(d) {return d.values;})
             .enter()
             .append("circle")
             .attr("r", function(d) {return sqrtScale(d.estimated_deaths);})
             .attr("cx", function(d) {return xScale(d.year);})
             .attr("cy" , function(d) {return yScale(d.number);})
             .style("fill", function(d) {return color_scheme(this.parentNode.__data__.magnitude);});

  // add the legend (both the magnitude categories and their colors)
  var line_legend_2 = svg2.selectAll(".lineLegend")
                          .data(new_data)
                          .enter()
                          .append("g")
                          .attr("class", "lineLegend")
                          .attr("transform", function (d, i) {
                           return "translate(" + (width + (margin.right/6)) + "," + (i*20)+")";
                           });

  line_legend_2.append("text")
               .text(function (d) {return d.magnitude;})
               .attr("transform", "translate(30,10)");

  line_legend_2.append("rect")
               .attr("fill", function (d) {return color_scheme(d.magnitude);})
               .attr("width", 20)
               .attr("height", 10);

  // add the title
  svg2.append("text")
      .attr("x", width/2)
      .attr("y", -margin.top/2)
      .style("font-size", "32px")
      .style("dx", "1em")
      .style("text-anchor", "middle")
      .text("Worldwide Earthquake stats 2000-2015 with symbols");

  // add the x-axis title
  svg2.append("text")
      .attr("x", width/2)
      .attr("y", (height + margin.top))
      .attr("dx", "1em")
      .style("font-size", "24px")
      .style("text-anchor", "middle")
      .text("Year");

  // add the y-axis title
  svg2.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -(height/2))
      .attr("y", -margin.left/1.5)
      .attr("dy", "1em")
      .style("font-size", "24px")
      .style("text-anchor", "middle")
      .text("Num of Earthqaukes");

  // draw the third line chart in square root scale

  // define scaleSqrt for the y-axis
  var ySqrtScale = d3.scaleSqrt()
                     .domain([0, d3.max(data, function(data) {return data["5_5.9"];})])
                     .range([height, 0]);

  svg3.append("g")
      .attr("class", "x-axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale))
      .style("font-size", "16px");

  svg3.append("g")
      .attr("class", "y axis")
      .call(d3.axisLeft(ySqrtScale))
      .style("font-size", "16px");

  // define the line function for creating lines in the sqrt scale
  var lineSqrtScale = d3.line()
                        .x(function(d) {return xScale(d.year);})
                        .y(function(d) {return ySqrtScale(d.number);})
                        .curve(d3.curveMonotoneX);

  var magnitude_3 = svg3.selectAll(".magnitude")
                        .data(new_data)
                        .enter()
                        .append("g")
                        .attr("class", "magnitude");

  // create multiple lines in their respective colors
  magnitude_3.append("path")
             .attr("class", "line")
             .attr("d", function(d) {return lineSqrtScale(d.values);})
             .style("stroke", function(d) {return color_scheme(d.magnitude);});

  // create circles of size proportional to their estimated deaths in their respective colors
  magnitude_3.selectAll("circle")
             .data(function(d) {return d.values;})
             .enter()
             .append("circle")
             .attr("r", function(d) {return sqrtScale(d.estimated_deaths);})
             .attr("cx", function(d) {return xScale(d.year);})
             .attr("cy" , function(d) {return ySqrtScale(d.number);})
             .style("fill", function(d) {return color_scheme(this.parentNode.__data__.magnitude);});

  // add the legend (both the magnitude categories and their colors)
  var line_legend_3 = svg3.selectAll(".lineLegend")
                          .data(new_data)
                          .enter()
                          .append("g")
                          .attr("class", "lineLegend")
                          .attr("transform", function (d, i) {
                           return "translate(" + (width + (margin.right/6)) + "," + (i*20)+")";
                           });

  line_legend_3.append("text")
               .text(function (d) {return d.magnitude;})
               .attr("transform", "translate(30,10)");

  line_legend_3.append("rect")
               .attr("fill", function (d) {return color_scheme(d.magnitude);})
               .attr("width", 20)
               .attr("height", 10);

  // add the title
  svg3.append("text")
      .attr("x", width/2)
      .attr("y", -margin.top/2)
      .style("font-size", "32px")
      .style("dx", "1em")
      .style("text-anchor", "middle")
      .text("Worldwide Earthquake stats 2000-2015 square root scale");

  // add the x-axis title
  svg3.append("text")
      .attr("x", width/2)
      .attr("y", (height + margin.top))
      .attr("dx", "1em")
      .style("font-size", "24px")
      .style("text-anchor", "middle")
      .text("Year");

  // add the y-axis title
  svg3.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -(height/2))
      .attr("y", -margin.left/1.5)
      .attr("dy", "1em")
      .style("font-size", "24px")
      .style("text-anchor", "middle")
      .text("Num of Earthqaukes");

  // draw the fourth line chart in log scale

  // define scaleLog for the y-axis
  var yLogScale = d3.scaleLog()
                    .domain([1, d3.max(data, function(d) {return d["5_5.9"];})]).range([height, 0]);

  svg4.append("g")
      .attr("class", "x-axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale))
      .style("font-size", "16px");

  svg4.append("g")
      .attr("class", "y axis")
      .call(d3.axisLeft(yLogScale))
      .style("font-size", "16px");

  // define the line function for creating lines in the log scale
  var lineLogScale = d3.line()
                       .x(function(d) {return xScale(d.year);})
                       .y(function(d) {
                        if (d.number == 0) {
                          return yLogScale(d.number+1);
                        } else {
                          return yLogScale(d.number);
                        }
                        })
                       .curve(d3.curveMonotoneX);

  var magnitude_4 = svg4.selectAll(".magnitude")
                        .data(new_data)
                        .enter()
                        .append("g")
                        .attr("class", "magnitude");

  // create multiple lines in their respective colors
  magnitude_4.append("path")
             .attr("class", "line")
             .attr("d", function(d) {return lineLogScale(d.values);})
             .style("stroke", function(d) {return color_scheme(d.magnitude);});

  // create circles of size proportional to their estimated deaths in their respective colors
  magnitude_4.selectAll("circle")
             .data(function(d) {return d.values;})
             .enter()
             .append("circle")
             .attr("r", function(d) {return sqrtScale(d.estimated_deaths);})
             .attr("cx", function(d) {return xScale(d.year);})
             .attr("cy" , function(d) {
              if (d.number == 0) {
                return yLogScale(d.number+1);
              } else {
                return yLogScale(d.number);
              }
              })
             .style("fill", function(d) {return color_scheme(this.parentNode.__data__.magnitude);});

  var line_legend_4 = svg4.selectAll(".lineLegend")
                          .data(new_data)
                          .enter()
                          .append("g")
                          .attr("class", "lineLegend")
                          .attr("transform", function (d, i) {return "translate(" + (width + (margin.right/6)) + "," + (i*20)+")";});

  // add the legend (both the magnitude categories and their colors)
  line_legend_4.append("text")
               .text(function (d) {return d.magnitude;})
               .attr("transform", "translate(30,10)");

  line_legend_4.append("rect")
               .attr("fill", function (d) {return color_scheme(d.magnitude);})
               .attr("width", 20)
               .attr("height", 10);

  svg4.append("text")
      .attr("x", width/2)
      .attr("y", -margin.top/2)
      .style("font-size", "32px")
      .style("dx", "1em")
      .style("text-anchor", "middle")
      .text("Worldwide Earthquake stats 2000-2015 log scale");

  // add the x-axis title
  svg4.append("text")
      .attr("x", width/2)
      .attr("y", (height + margin.top))
      .attr("dx", "1em")
      .style("font-size", "24px")
      .style("text-anchor", "middle")
      .text("Year");

  // add the y-axis title
  svg4.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -(height/2))
      .attr("y", -margin.left/1.5)
      .attr("dy", "1em")
      .style("font-size", "24px")
      .style("text-anchor", "middle")
      .text("Num of Earthqaukes");
  })