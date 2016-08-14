var JSON2LineGraph = function(options){
	var element, yUnit, xKey, yKeys, json;

	var optionNames = ['element', 'yUnit', 'xKey', 'yKeys', 'json'];

	for(var i = 0; i < optionNames.length; i++){
		if(options[optionNames[i]] === undefined)
			throw "undefined '" + optionNames[i] + "'";
	}
	element = options['element'];
	yUnit = options['yUnit'];
	xKey = options['xKey'];
	yKeys = options['yKeys'];
	json = JSON.parse(options['json']);

	var xPadding = 50;
	var yPadding = 30;

	var graph = document.getElementById(element);
	graph.height = graph.getBoundingClientRect().height;
	graph.width = graph.getBoundingClientRect().width;

	document.write(graph.height);
	document.write(graph.width);

	var c = graph.getContext('2d');
	c.lineWidth = 2;
	c.strokeStyle = '#333';
	c.font = 'italic 8pt sans-serif';
	c.textAlign = "center";

	// draw base line
	c.beginPath();
	c.moveTo(xPadding, 0);
	c.lineTo(xPadding, graph.height - yPadding);
	c.lineTo(graph.width, graph.height - yPadding);
	c.stroke();

	// write X line text
	for(var i = 0; i < json.length; i++)
		c.fillText(json[i][xKey], getXPixel(i), graph.height - yPadding + 20);

	// write Y line text
	c.textAlign = "right"
	c.textBaseline = "middle";
	for(var i = 0; i < getMaxY(); i += 10)
		c.fillText(i + yUnit, xPadding - 10, getYPixel(i));

	// draw line
	for(var i = 0; i < yKeys.length; i++){
		c.strokeStyle = '#f00';
		c.beginPath();
		c.moveTo(getXPixel(0), getYPixel(Number(json[0][yKeys[i]])));
		for(var j = 1; j < json.length; j++)
			c.lineTo(getXPixel(j), getYPixel(Number(json[j][yKeys[i]])));
		c.stroke();
	}

	// draw top points
	for(var i = 0; i < yKeys.length; i++){
		c.fillStyle = '#333';
		for(var j = 0; j < json.length; j++){
			c.beginPath();
			c.arc(getXPixel(j), getYPixel(Number(json[j][yKeys[i]])), 4, 0, Math.PI * 2, true);
			c.fill();
		}
	}

	/* FUNCTIONS */

	// Returns the max Y value in our json list
	function getMaxY(){
		var max = 0;

		for(var i = 0; i < yKeys.length; i++){
			for(var j = 0; j < json.length; j++){
				if(Number(json[j][yKeys[i]]) > max)
					max = Number(json[j][yKeys[i]]);
			}
		}
		return max += 10 - max % 10;
	}

	// Return the x pixel for a graph point
	function getXPixel(val){
		return ((graph.width - xPadding) / json.length) * val + (xPadding * 1.5);
	}

	// Return the y pixel for a graph point
	function getYPixel(val){
		return graph.height - (((graph.height - yPadding) / getMaxY()) * val) - yPadding;
	}
}
