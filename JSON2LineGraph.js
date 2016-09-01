var JSON2LineGraph = function(options){
	var element, yUnit, xKey, yKeys, json, lineColors;

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

	if(options['lineColors'] !== undefined){
		if(options['lineColors'].length < yKeys.length)
			throw 'short lineColors.\nyKeys: ' + yKeys.length + '\nlineColors: ' + options['lineColors'].length;
		else
			lineColors = options['lineColors'];
	}else{
		lineColors = ['#0b62a4', '#7A92A3', '#4da74d', '#afd8f8', '#edc240', '#cb4b4b', '#9440ed'];
	}

	var xPadding = 50;
	var yPadding = 30;

	var graph = document.getElementById(element);
	graph.height = graph.getBoundingClientRect().height;
	graph.width = graph.getBoundingClientRect().width;

	var c = graph.getContext('2d');
	c.lineWidth = 2;
	c.strokeStyle = '#000000';
	c.font = '8pt sans-serif';
	c.textAlign = 'center';

	// draw base line
	c.beginPath();
	c.moveTo(xPadding, 0);
	c.lineTo(xPadding, graph.height - yPadding);
	c.lineTo(graph.width - xPadding, graph.height - yPadding);
	c.stroke();

	// write X line text
	for(var i = 0; i < json.length; i++)
		c.fillText(json[i][xKey], getXPixel(i), graph.height - yPadding + 20);

	// write Y line text
	c.textAlign = 'right'
	c.textBaseline = 'middle';
	for(var i = 0; i < getMaxY(); i += 10)
		c.fillText(i + yUnit, xPadding - 10, getYPixel(i));

	// draw line
	for(var i = 0; i < yKeys.length; i++){
		c.strokeStyle = lineColors[i];
		c.beginPath();
		c.moveTo(getXPixel(0), getYPixel(Number(json[0][yKeys[i]])));
		for(var j = 1; j < json.length; j++)
			c.lineTo(getXPixel(j), getYPixel(Number(json[j][yKeys[i]])));
		c.stroke();
	}

	// draw top points
	for(var i = 0; i < yKeys.length; i++){
		for(var j = 0; j < json.length; j++){
			var num = Number(json[j][yKeys[i]]);

			// draw base white point
			c.beginPath();
			c.fillStyle = '#ffffff';
			c.arc(getXPixel(j), getYPixel(num), 6, 0, Math.PI * 2, true);
			c.fill();

			// draw point
			c.beginPath();
			c.fillStyle = lineColors[i];
			c.arc(getXPixel(j), getYPixel(num), 4, 0, Math.PI * 2, true);
			c.fill();

			// write points value
			c.fillText(num, getXPixel(j) + 10, getYPixel(num) - 15);
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
