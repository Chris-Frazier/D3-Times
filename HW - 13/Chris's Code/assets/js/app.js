// @TODO: YOUR CODE HERE!
(async function(){
    const 
       svgWidth = 960;
       svgHeight = 500;

    const margin = {
        top: 20,
        right: 40,
        bottom: 80,
        left: 100
    };

    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

   const svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

    const chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const data = await d3.csv("data.csv");
    console.log(data);

    data.forEach(function(data) {
        data.income = +data.income;
        data.obesity = +data.obesity;
    });

    const xLinearScale = d3.scaleLinear()
    .domain([d3.min(data, d => d.income), d3.max(data, d => d.income)])
    .range([0, width]);

    const yLinearScale = d3.scaleLinear()
    .domain([d3.min(data, d => d.obesity), d3.max(data, d => d.obesity)])
    .range([height, 0]);

    const bottomAxis = d3.axisBottom(xLinearScale);
    const leftAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

    chartGroup.append("g")
    .call(leftAxis);

    circlesGroup = chartGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.income))
        .attr("cy", d => yLinearScale(d.obesity))
        .attr("r", "10")
        .attr("fill", "blue")
        .attr("opacity", ".5")
        
    textGroup = chartGroup.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("x", d => xLinearScale(d.income))
        .attr("y", d => yLinearScale(d.obesity))
        .text(data.abbr)
        
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Obesity");

    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("class", "axisText")
        .text("Income ($)");
})()
