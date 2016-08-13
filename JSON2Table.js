// targetElementId : insert table data element id
// jsonKeys : json's key as array
// jsonData : json text data

var JSON2Table = function(targetElementId, jsonKeys, jsonData) {
	// sample data
	//var targetElementId = 'sample-table';
	//var jsonData = '[{"date":"2016-08-11 19:00","temp":"20.96"},{"date":"2016-08-11 20:00","temp":"22.13"},{"date":"2016-08-11 21:00","temp":"21.89"},{"date":"2016-08-11 22:00","temp":"21.28"},{"date":"2016-08-11 23:00","temp":"20.81"},{"date":"2016-08-12 00:00","temp":"20.86"},{"date":"2016-08-12 01:00","temp":"22.15"},{"date":"2016-08-12 02:00","temp":"21.52"},{"date":"2016-08-12 03:00","temp":"20.61"},{"date":"2016-08-12 04:00","temp":"21.04"}]';
	//var jsonKeys = ["date", "temp"];
	// end sample

	// parse JSON text Data
	var json = JSON.parse(jsonData);

	// create table element
	var table = document.createElement("table");
	// target element append table element
	document.getElementById(targetElementId).appendChild(table);

	// create thead
	var thead = table.createTHead();
	// insert thead's row
	var theadRow = thead.insertRow(-1);
	// create th jsonKeys times, append thead's row, jsonKeys name title
	for(var i = 0; i < jsonKeys.length; i++){
		var th = document.createElement("th");
		theadRow.appendChild(th);
		th.innerHTML = jsonKeys[i];
	}

	// create tbody
	var tbody = table.createTBody();
	// insert tbody's row json times
	for(var i = 0; i < json.length; i++){
		var tbodyRow = tbody.insertRow(-1);
		// create td jsonKeys times, append tbody's row, json value
		for(var j = 0; j < jsonKeys.length; j++){
			var td = document.createElement("td");
			tbodyRow.appendChild(td);
			td.innerHTML = json[i][jsonKeys[j]];
		}
	}
}
