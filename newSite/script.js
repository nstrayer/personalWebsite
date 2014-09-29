var padding = 8,
	w = 200,
	h = 600,
	radius = 35, //Radius of menu bubbles
	selectorWidth = 180, //Width of open/close menu button
	selectorHeight = 30,
	menuOpen = false, //Start with menu closed
	divSelection;

var cRed   = "#E74327",
	cBrown = "#E8940C",
	cBlue  = "#0CBDE8",
	cGreen = "#98C000",
	cGrey  = "#3D4C53";

var menuData = [{"name": "me",       "color": cRed  },
				{"name": "resume",   "color": cBrown}, 
				{"name": "projects", "color": cBlue },
				{"name": "contact",  "color": cGreen}
		 	   ]

var svg = d3.select("#menuBar")
				.append("svg")
				.attr("height", h)
				.attr("width",  w)

var menuAction = function(whatToDo){
	if (whatToDo == "draw"){
		d3.selectAll(".sectionDivs").classed("blurred", true)
		changeSelectorText("close menu")		
		svg.selectAll("circle")
			.data(menuData)
			.enter()
			.append("circle")
			.attr("class","menuBubbles")
			.attr("cx", function(d,i) {
				if (i%2 == 0) { //if even draw on left side
					return radius
				} else {
					return (w - radius)
				}})
			.attr("cy", -radius) //Start outside of window to slide down. 
			.transition()
			.duration(1000)
			.ease("elastic")
			.attr("cy", function(d,i){ return (radius*4 + ((h*i)/5)) }) //draw the circles descending the div
			.attr("r" , radius)
			.attr("id", function(d) {return (d.name + "Circ")})
			.attr("fill", function(d) {return d.color})
			.each("end", function(){
				svg.selectAll("circle").on("click", function(){
					divSelection = "#" + d3.select(this).attr("id").slice(0,-4) + "Div"
					console.log("read in selection of div location")
					divSwitcher(divSelection)
					menuAction("close")
					menuOpen = false
				})
			})
	} else {
		d3.selectAll(".sectionDivs").classed("blurred", false)
		changeSelectorText("open menu")	
		svg.selectAll("circle")
			.transition()
			.attr("cy", -radius)
			.remove()
	}
}

svg.append("rect")
	.attr("id", "selector")
	.attr("x", w/2 - selectorWidth/2)
	.attr("y", 0)
	.attr("rx", 15)
	.attr("ry", 15)
	.attr("width", selectorWidth)
	.attr("height", selectorHeight)
	.attr("fill", cGrey)
	.on("click", function(){
		menuOpen = clickedSelector()
	})

svg.append("text")
	.attr("id", "selectorText")
	.attr("x", w/2)
	.attr("y", selectorHeight/2 + 7)
	.attr("text-anchor", "middle")
	.text("open menu")
	.attr("fill", "white")
	.attr("font-family", "optima")
	.attr("font-size", 18)
	.on("click", function(){
		menuOpen = clickedSelector()
	})

function changeSelectorText(whatToSay){
	svg.select("#selectorText")
		.text(whatToSay)
}

function clickedSelector(){
		if (menuOpen){
			menuAction("close")		
			menuOpen = false
			console.log("close the menu")
			return menuOpen
		} else {
			menuAction("draw")
			menuOpen = true
			console.log("open the menu")
			return menuOpen
		}
}

function divSwitcher(switchTo){
	d3.selectAll(".sectionDivs").classed("hidden", true)
	d3.selectAll(switchTo).classed("hidden", false)
}

