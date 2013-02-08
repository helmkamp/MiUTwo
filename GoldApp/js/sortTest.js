$(document).delegate("#newsstream", "pagecreate", function() {

	var objArray = [], // Create an empty array for the objects in localStorage to go in
		numItemsLS = localStorage.length;

	// Take each object from localStorage and push it into an array
	for(var k = 0; k < numItemsLS; k++) {
		var key = localStorage.key(k);
		var value = localStorage.getItem(key);
		var obj = $.parseJSON(value);
		
		objArray.push(obj);
	}

	//console.log(objArray);
	// Sort the items by start date
	objArray.sort(function(a, b) {
		var aDate = a.startDate[1].replace(/-/g, "");
		var bDate = b.startDate[1].replace(/-/g, "");
		return aDate - bDate;
	});
	
	// Create the list to show on the page
	var markup = "<ul id='categoryView' data-role='listview' data-inset='true' data-filter='true'>";

	var numItemsOA = objArray.length;
	for(var i = 0; i < numItemsOA; i++) {
		markup += "<li><h1>" + objArray[i].itemName[1] + "</h1>";
		markup += "<p>" + objArray[i].startDate[0] + " " + objArray[i].startDate[1] + "</p>";
		markup += "<p>" + objArray[i].endDate[0] + " " + objArray[i].endDate[1] + "</p>";
		markup += "<p>" + objArray[i].priority[0] + " " + objArray[i].priority[1] + "</p>";
		markup += "<p>" + objArray[i].comments[0] + " " + objArray[i].comments[1] + "</p>";
		markup += "</li>";
	}

	markup += "</ul>";

	// Add the list to the page
	$('div#newsContent').html(markup);


});



/********* Not currently working ***********/
// Refactoring of Browse By code so there's not 10 different if statements
//
// Generate a list item for each item in the category
// and add it to our markup.
function addMarkUp (catName, highlight, priority) {
	highlight = (highlight === undefined) ? "No" : highlight;
	priority = (priority === undefined) ? 0 : priority;

	// The object of items for this category.
	for(var j = 0; j < numItems; j++) {
		key = localStorage.key(j);
		value = localStorage.getItem(key);
		obj = $.parseJSON(value);

		if ((categoryName === catName) && (obj.highlighted[1] === highlight)) {
			if (obj.priority[1] === priority) {
				markup += "<li><h1>" + obj.itemName[1] + "</h1>";
				markup += "<p>" + obj.startDate[0] + " " + obj.startDate[1] + "</p>";
				markup += "<p>" + obj.endDate[0] + " " + obj.endDate[1] + "</p>";
				markup += "<p>" + obj.priority[0] + " " + obj.priority[1] + "</p>";
				markup += "<p>" + obj.comments[0] + " " + obj.comments[1] + "</p>";
				markup += "</li>";
			}
		}
	}
}