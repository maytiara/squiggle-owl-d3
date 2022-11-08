// convert to typescript file

// dummy data using random numbers to represent the value per slice
const randomData = [
	[10, 20, 30, 40, 50, 60, 70, 80, 90, 80],
	[45, 12, 34, 55, 60, 97, 31, 23, 89, 50],
  [11, 22, 33, 44, 55, 32, 80, 99, 150, 67]
];

// specified palette which I prefer however, d3 has a built-in colorScheme
const palette = [
	"#98abc5",
	"#CACFD2",
	"#B2AF21 ",
	"#6b486b",
	"#a05d56",
	"#d0743c",
	"#ff8c00",
	"#90A183",
	"#D6A6AF",
	"#5B7DAA",
];

// function to randomly select the randomData
let dataById = 0;
regenerateBtn();

function regenerateBtn() {
	let currentData = randomData[dataById]; 
	dataById = (dataById + 10) % randomData.length; //optional to set the number of Data to be selected
	render(currentData);
}

// this function renders the data and convert it to slices
function render(data) {
	console.log("rendered", data);

  // Dimension set for the pie
	const diameter = 300; //height
	const radius = diameter / 2; 

  // create a pie generator - default pie function
	const pie = d3.pie()
                .value(function(d) { return d;})
                .sort(null);

  // set the color scale
	const colorScheme = d3.scaleOrdinal()
                      .domain(data)
                      .range(palette);

  // create an arc -helper to draw the shape
	const arc = d3.arc()
		          .innerRadius(radius * 0) //set to 0-default
		          .outerRadius(radius);

  // select the svg in the DOM
	const svg = d3.select("svg");

  // selects the arcs and transform the positioning of the radius value
	const arcLayer = svg.select(".arcs")
		                  .attr("transform", "translate(" + radius + ", " + radius + ")");

	const arcs = arcLayer.selectAll(".arc")
                       .data(pie(data))
                       
                       // hover effect when you select an arc
                       .on('mouseover', function () { 
                        d3.select(this)
                          .transition() //default
                          .duration('50')
                          .attr('opacity', '.65') //set an attribute for styling
                       })
                       .on('mouseout', function () { 
                        d3.select(this)
                          .transition() //default
                          .duration('50')
                          .attr('opacity', '10'); //set an attribute for styling
                       });
           
  // draw the arc paths
	arcs.enter()
		  .append("path") //create new path
		  .attr("class", "arc")
		  .merge(arcs)
		  .style("stroke", "white")
		  .attr("fill", function (d) {
		  	return colorScheme(d.data);
		  })
		  .attr("d", arc);

  // (optional) 
  arcs.exit()
      .remove(); 

}
