var testWidth  = parseFloat(d3.select(".sectionDivs").style("width").slice(0,-2))
var testHeight = parseFloat(d3.select(".sectionDivs").style("height").slice(0,-2))
console.log(testWidth)
console.log(testHeight)

var padding = 8,
	w = 0.4 * (parseFloat(d3.select(".sectionDivs").style("width").slice(0,-2))),
	// h = 600,
	h = parseFloat(d3.select(".sectionDivs").style("height").slice(0,-2)),
	radius = 50, //Radius of menu bubbles
	selectorWidth = 200, //Width of open/close menu button
	selectorHeight = 50,
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
			.attr("cx", function(d,i) { return menuXPos(i) })
			.attr("cy", -radius) //Start outside of window to slide down. 
			.transition()
			.duration(600)
			.ease("elastic")
			.attr("cy", function(d,i){ return (radius*3 + ((h*i)/5)) }) //draw the circles descending the div
			.attr("r" , radius)
			.attr("id", function(d) {return (d.name + "Circ")})
			.attr("fill", function(d) {return d.color})
			.each("end", function(){ //avoids transition getting messed up by interactions.
				svg.selectAll("circle").on("click", function(){
					divSelection = "#" + d3.select(this).attr("id").slice(0,-4) + "Div"
					divSwitcher(divSelection)
					menuAction("close")
					menuOpen = false
				})
			})

		svg.selectAll(".menuText")
			.data(menuData)
			.enter()
			.append("text")
			.attr("class", "menuText")
			.attr("id", function(d){return d.name + "Div"})
			.attr("x", function(d,i){ return menuXPos(i) })
			.attr("y", -radius)
			.attr("text-anchor", "middle")
			.attr("font-family", "optima")
			.attr("fill", "white")
			.attr("font-size", 20)
			.text(function(d){return d.name})
			.transition()
			.duration(600)
			.ease("elastic")
			.attr("y", function(d,i){ return ( radius*3 + ((h*i)/5)) + 6.5 })
			.each("end", function(){ //avoids transition getting messed up by interactions.
				svg.selectAll(".menuText").on("click", function(){
					divSelection = "#" + d3.select(this).attr("id")
					divSwitcher(divSelection)
					menuAction("close")
					menuOpen = false
				})
			})


	} else { //Close menu
		d3.selectAll(".sectionDivs").classed("blurred", false) //Unblur the sections
		changeSelectorText("menu")	 //Change menu text to open menu
		svg.selectAll(".menuBubbles")
			.transition()
			.attr("cy", -radius) //Shoot menu bubbles off screen.
			.remove()
		svg.selectAll(".menuText")
			.transition()
			.attr("y", -radius) //Shoot menu bubbles off screen.
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
	.attr("fill-opacity", 0.5)
	.on("click", function(){
		menuOpen = clickedSelector()
	})
	.on("mouseover", function(){
		hoveredSelector("in")
	})
	.on("mouseout", function(){
		hoveredSelector("out")
	})

svg.append("text")
	.attr("id", "selectorText")
	.attr("x", w/2)
	.attr("y", selectorHeight/2 + 7)
	.attr("text-anchor", "middle")
	.text("menu")
	.attr("fill", "white")
	.attr("font-family", "optima")
	.attr("font-size", 22)
	.on("click", function(){
		menuOpen = clickedSelector()
	})
	.on("mouseover", function(){
		hoveredSelector("in")
	})
	.on("mouseout", function(){
		hoveredSelector("out")
	})

function hoveredSelector(how){
	if (how == "in"){
		var opacity = 1
	} else {
		var opacity = 0.5 
	}	
	d3.select("#selector")
		.transition()
		.duration(600)
		.attr("fill-opacity", opacity)
}

function menuXPos(index){
	if (index%2 == 0) { //if even draw on left side
		return radius
	} else {
		return (w - radius)
	}
}

function changeSelectorText(whatToSay){
	svg.select("#selectorText")
		.text(whatToSay)
}

function clickedSelector(){
		if (menuOpen){
			menuAction("close")		
			return false
		} else {
			menuAction("draw")
			return true
		}
}

function divSwitcher(switchTo){
	d3.selectAll(".sectionDivs").classed("hidden", true)
	d3.selectAll(switchTo).classed("hidden", false)
}

