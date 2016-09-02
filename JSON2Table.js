var JSON2Table = function(options) {
	var element, keys, json, customTitles, unit, appendUnitKeys;

	var optionNames = ['element', 'keys', 'json'];

	for(var i = 0; i < optionNames.length; i++){
		if(options[optionNames[i]] === undefined)
			throw "undefined '" + optionNames[i] + "'";
	}
	element = options['element'];
	keys = options['keys'];
	json = JSON.parse(options['json']);

	customTitles = options['customTitles'];
	unit = options['unit'];
	appendUnitKeys = options['appendUnitKeys'];

	if(customTitles !== undefined){
		if(customTitles.length < keys.length)
			throw "short 'customTitles'\nkeys: " + keys.length + '\ncustomTitles: ' + customTitles.length;
	}
	if(unit !== undefined){
		if(appendUnitKeys === undefined)
			throw "undefined 'appendUnitKeys'\nif define 'unit', define 'appendUnitKeys'";
	}else{
		if(appendUnitKeys !== undefined)
			throw "undefined 'unit'\nif define 'appendUnitKeys', define 'unit'";
		unit = '';
		appendUnitKeys = '';
	}

	/*
	 * create <table>
	 * target element append <table>
	 */
	var table = document.createElement("table");
	document.getElementById(element).appendChild(table);

	/*
	 * create <thead>
	 * insert row in <thead> once
	 * create <th> 'keys' length times
	 * append row in <thead>
	 * <th> title is 'keys' value.
	 */
	var thead = table.createTHead();
	var theadRow = thead.insertRow(-1);
	for(var i = 0; i < keys.length; i++){
		var th = document.createElement("th");
		theadRow.appendChild(th);
		if(customTitles === undefined)
			th.innerHTML = keys[i];
		else
			th.innerHTML = customTitles[i];
	}

	/*
	 * create <tbody>
	 * insert rows in <tbody> json object times
	 * create <td> 'keys' length times
	 * append <td> in row of <tbody>
	 * <td> value is get from json data
	 */
	var tbody = table.createTBody();
	for(var i = 0; i < json.length; i++){
		var tbodyRow = tbody.insertRow(-1);
		for(var j = 0; j < keys.length; j++){
			var td = document.createElement("td");
			tbodyRow.appendChild(td);
			if(appendUnitKeys.indexOf(keys[j]) !== -1)
				td.innerHTML = json[i][keys[j]] + unit;
			else
				td.innerHTML = json[i][keys[j]];
		}
	}
}
