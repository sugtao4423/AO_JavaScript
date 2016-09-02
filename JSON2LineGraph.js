/*
 * Using this as a reference.
 * http://www.worldwidewhat.net/2011/06/draw-a-line-graph-using-html5-canvas/
 *
 * default lineColors is from morris.js
 *
 * Copyright (c) 2012-2014, Olly Smith
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

var JSON2LineGraph = function(options){
	var element, xKey, yKeys, json, yUnit, lineColors;

	var requireNames = ['element', 'xKey', 'yKeys', 'json'];

	for(var i = 0; i < requireNames.length; i++){
		if(options[requireNames[i]] === undefined)
			throw "undefined '" + requireNames[i] + "'";
	}
	element = options['element'];
	xKey = options['xKey'];
	yKeys = options['yKeys'];
	json = JSON.parse(options['json']);

	yUnit = options['yUnit'] === undefined ? '' : options['yUnit'];

	lineColors = options['lineColors'];
	if(lineColors !== undefined){
		if(lineColors.length < yKeys.length)
			throw "short 'lineColors'\nyKeys: " + yKeys.length + '\nlineColors: ' + lineColors.length;
	}else{
		lineColors = ['#0b62a4', '#7a92a3', '#4da74d', '#afd8f8', '#edc240', '#cb4b4b', '#9440ed'];
	}

	var xPadding = String(getMaxY()).length * 20;
	var yPadding = 40;

	var graph = document.getElementById(element);
	graph.height = graph.getBoundingClientRect().height;
	graph.width = graph.getBoundingClientRect().width;

	var c = graph.getContext('2d');
	c.font = '8pt sans-serif';
	c.textAlign = 'center';

	// write X line date
	var oldDate = 0;
	var lineHeight = c.measureText('あ').width;
	for(var i = 0; i < json.length; i++){
		var date = new Date(json[i][xKey]);
		var xPixel = getXPixel(i);
		var yPixel = graph.height - yPadding + 20;

		var hhmm = ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
		if(oldDate === date.toDateString()){
			c.fillText(hhmm, xPixel, yPixel + lineHeight);
		}else{
			var year = date.getFullYear();
			var month = ('0' + (date.getMonth() + 1)).slice(-2);
			var dateOfMonth = ('0' + date.getDate()).slice(-2);
			var str = year + '-' + month + '-' + dateOfMonth;
			c.fillText(str, xPixel, yPixel);
			c.fillText(hhmm, xPixel, yPixel + lineHeight);
			oldDate = date.toDateString();
		}
	}

	// write Y line text and support line
	c.textAlign = 'right'
	c.textBaseline = 'middle';
	c.lineWidth = 1;
	c.strokeStyle = '#e0e0e0'
	var maxY = getMaxY();
	for(var i = 0; i < maxY + maxY / 2; i += maxY / 5){
		var yPixel = getYPixel(i);
		c.fillText(Math.round(i) + yUnit, xPadding - 10, yPixel);
		c.beginPath();
		c.moveTo(xPadding, yPixel);
		c.lineTo(graph.width, yPixel);
		c.stroke();
	}

	// draw base line
	c.lineWidth = 2;
	c.strokeStyle = '#000000';
	c.beginPath();
	c.moveTo(xPadding, 0);
	c.lineTo(xPadding, graph.height - yPadding);
	c.lineTo(graph.width, graph.height - yPadding);
	c.stroke();

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
			var xPixel = getXPixel(j);
			var yPixel = getYPixel(num);

			// draw base white point
			c.beginPath();
			c.fillStyle = '#ffffff';
			c.arc(xPixel, yPixel, 6, 0, Math.PI * 2, true);
			c.fill();

			// draw point
			c.beginPath();
			c.fillStyle = lineColors[i];
			c.arc(xPixel, yPixel, 4, 0, Math.PI * 2, true);
			c.fill();

			// write points value
			c.textAlign = 'center';
			c.fillText(num + yUnit, xPixel, yPixel - 15);
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
		return graph.height - (((graph.height - yPadding * 3) / getMaxY()) * val) - yPadding;
	}
}
