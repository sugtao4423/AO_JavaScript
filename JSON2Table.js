var JSON2Table = function(options) {
	var element, keys, json;

	var optionNames = ['element', 'keys', 'json'];

	for(var i = 0; i < optionNames.length; i++){
		if(options[optionNames[i]] === undefined)
			throw "undefined '" + optionNames[i] + "'";
	}
	element = options['element'];
	keys = options['keys'];
	json = JSON.parse(options['json']);

	// create table element
	var table = document.createElement("table");
	// target element append table element
	document.getElementById(element).appendChild(table);

	// create thead
	var thead = table.createTHead();
	// insert thead's row
	var theadRow = thead.insertRow(-1);
	// create th keys times, append thead's row, keys name title
	for(var i = 0; i < keys.length; i++){
		var th = document.createElement("th");
		theadRow.appendChild(th);
		th.innerHTML = keys[i];
	}

	// create tbody
	var tbody = table.createTBody();
	// insert tbody's row json times
	for(var i = 0; i < json.length; i++){
		var tbodyRow = tbody.insertRow(-1);
		// create td keys times, append tbody's row, json value
		for(var j = 0; j < keys.length; j++){
			var td = document.createElement("td");
			tbodyRow.appendChild(td);
			td.innerHTML = json[i][keys[j]];
		}
	}
}
