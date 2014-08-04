//Pseudo-code for method to track user interaction with LITW Visualization

var userData = []

/*
context: 

.on(click)...

var whatAction = "click"
...
*/

var tracker = function(){
	var selected = d3.select(this); //selects the object that the action was preformed on
	var currentTime = new Date().getTime(); //gets the current time (in milliseconds)
	var dictEntry = {object: selected.country, time: currentTime, action: whatAction}; //assembles the dictionary of info
	userData.push(dictEntry); //appends the dict to the array
}

