//---Browse By...---//
// The base code was found on the jQuery Mobile Docs site
// It was then edited to fit my needs
// Load the data for a specific category, based on
// the URL passed in. Generate markup for the items in the
// category, inject it into an embedded page, and then make
// that page the current active page.

function showCategory(urlObj, options) {
	var categoryName = urlObj.hash.replace(/.*category=/, ""),

		// The pages we use to display our content are already in
		// the DOM. The id of the page we are going to write our
		// content into is specified in the hash before the '?'.
		pageSelector = urlObj.hash.replace(/\?.*$/, "");

	if(localStorage) {
		// Get the page we are going to dump our content into.
		var $page = $(pageSelector),

			// Get the header for the page.
			$header = $page.children(":jqmData(role=header)"),

			// Get the content area element for the page.
			$content = $page.children(":jqmData(role=content)"),

			// The markup we are going to inject into the content
			// area of the page.
			//markup = "<div><a href='#' data-role='button' data-icon='delete' data-iconpos='right' data-theme='a' id='deleteAll'>Clear All Data</a></div>";
			markup = "<ul id='categoryView' data-role='listview' data-inset='true' data-filter='true'>";
				
		// The number of items in the category.
		var numItems = localStorage.length,
			key, value, obj,
			objArray = [];

		if(categoryName === "Priority") {

			// Take each object from localStorage and push it into an array
			for(var k = 0; k < numItems; k++) {
				key = localStorage.key(k);
				value = localStorage.getItem(key);
				obj = $.parseJSON(value);
				objArray.push(obj);
			}

			// Sort the items by priority from 1 to 3
			objArray.sort(function(a, b) {
				return a.priority[1] - b.priority[1];
			});

			for(var i = 0; i < objArray.length; i++) {
				markup += "<li class='catView'><h1>" + objArray[i].itemName[1] + "</h1>";
				markup += "<p>" + objArray[i].startDate[0] + " " + objArray[i].startDate[1] + "</p>";
				markup += "<p>" + objArray[i].endDate[0] + " " + objArray[i].endDate[1] + "</p>";
				markup += "<p>" + objArray[i].category[0] + " " + objArray[i].category[1] + "</p>";
				markup += "<p>" + objArray[i].priority[0] + " " + objArray[i].priority[1] + "</p>";
				markup += "<p>" + objArray[i].comments[0] + " " + objArray[i].comments[1] + "</p>";
				markup += "</li>";
			}
		} else if(categoryName === "All Items") {
			// Add a Delete All button
			//markup += "<a href='#' data-role='button' data-icon='delete' data-iconpos='right' data-theme='e' id='deleteAll'>Delete All Items</a>";
			// The object of items for this category.
			for(var a = 0; a < numItems; a++) {
				key = localStorage.key(a);
				value = localStorage.getItem(key);
				obj = $.parseJSON(value);

				// Generate a list item for each item in the category
				// and add it to our markup.
				markup += "<li><a href='#editItem?edit=" + key + "'><h1>" + obj.itemName[1] + "</h1>";
				markup += "<p>" + obj.startDate[0] + " " + obj.startDate[1] + "</p>";
				markup += "<p>" + obj.endDate[0] + " " + obj.endDate[1] + "</p>";
				markup += "<p>" + obj.category[0] + " " + obj.category[1] + "</p>";
				markup += "<p>" + obj.priority[0] + " " + obj.priority[1] + "</p>";
				markup += "<p>" + obj.comments[0] + " " + obj.comments[1] + "</p>";
				markup += "</a>";
				markup += "<a href='#delItem?delete=" + key + "' data-icon='delete' data-theme='d'></a>";
				markup += "</li>";
			}

		} else if(categoryName === "Start Date") {
			// Take each object from localStorage and push it into an array
			for(var p = 0; p < numItems; p++) {
				key = localStorage.key(p);
				value = localStorage.getItem(key);
				obj = $.parseJSON(value);

				objArray.push(obj);
			}

			// Sort the items by start date
			objArray.sort(function(a, b) {
				var aDate = a.startDate[1].replace(/-/g, "");
				var bDate = b.startDate[1].replace(/-/g, "");
				return aDate - bDate;
			});

			for(var s = 0; s < objArray.length; s++) {
				markup += "<li><h1>" + objArray[s].itemName[1] + "</h1>";
				markup += "<p>" + objArray[s].startDate[0] + " " + objArray[s].startDate[1] + "</p>";
				markup += "<p>" + objArray[s].endDate[0] + " " + objArray[s].endDate[1] + "</p>";
				markup += "<p>" + objArray[s].priority[0] + " " + objArray[s].priority[1] + "</p>";
				markup += "<p>" + objArray[s].comments[0] + " " + objArray[s].comments[1] + "</p>";
				markup += "</li>";
			}
			
		} else if(categoryName === "End Date") {
			// Take each object from localStorage and push it into an array
			for(var b = 0; b < numItems; b++) {
				key = localStorage.key(b);
				value = localStorage.getItem(key);
				obj = $.parseJSON(value);

				objArray.push(obj);
			}

			// Sort the items by start date
			objArray.sort(function(a, b) {
				var aDate = a.endDate[1].replace(/-/g, "");
				var bDate = b.endDate[1].replace(/-/g, "");
				return aDate - bDate;
			});

			for(var e = 0; e < objArray.length; e++) {
				markup += "<li><h1>" + objArray[e].itemName[1] + "</h1>";
				markup += "<p>" + objArray[e].startDate[0] + " " + objArray[e].startDate[1] + "</p>";
				markup += "<p>" + objArray[e].endDate[0] + " " + objArray[e].endDate[1] + "</p>";
				markup += "<p>" + objArray[e].priority[0] + " " + objArray[e].priority[1] + "</p>";
				markup += "<p>" + objArray[e].comments[0] + " " + objArray[e].comments[1] + "</p>";
				markup += "</li>";
			}
		} else {

			// The object of items for this category.
			for(var j = 0; j < numItems; j++) {
				key = localStorage.key(j);
				value = localStorage.getItem(key);
				obj = $.parseJSON(value);

				// Generate a list item for each item in the category
				// and add it to our markup.
				if(categoryName === obj.category[1]) {
					markup += "<li><h1>" + obj.itemName[1] + "</h1>";
					markup += "<p>" + obj.startDate[0] + " " + obj.startDate[1] + "</p>";
					markup += "<p>" + obj.endDate[0] + " " + obj.endDate[1] + "</p>";
					markup += "<p>" + obj.priority[0] + " " + obj.priority[1] + "</p>";
					markup += "<p>" + obj.comments[0] + " " + obj.comments[1] + "</p>";
					markup += "</li>";
				}
			}
		}

		markup += "</ul>";



		// Find the h1 element in our header and inject the name of
		// the category into it.
		$header.find("h1").html(categoryName);

		// Inject the category items markup into the content element.
		$content.html(markup);

		// Pages are lazily enhanced. We call page() on the page
		// element to make sure it is always enhanced before we
		// attempt to enhance the listview markup we just injected.
		// Subsequent calls to page() are ignored since a page/widget
		// can only be enhanced once.
		$page.page();

		// Enhance the listview we just injected.
		$content.find(":jqmData(role=listview)").listview();
		// We don't want the data-url of the page we just modified
		// to be the url that shows up in the browser's location field,
		// so set the dataUrl option to the URL for the category
		// we just loaded.
		options.dataUrl = urlObj.href;

		// Now call changePage() and tell it to switch to
		// the page we just modified.
		$.mobile.changePage($page, options);
	}
}

// Listen for any attempts to call changePage().
$(document).on("pagebeforechange", function(e, data) {

	// We only want to handle changePage() calls where the caller is
	// asking us to load a page by URL.
	if(typeof data.toPage === "string") {

		// We are being asked to load a page by URL, but we only
		// want to handle URLs that request the data for a specific
		// category.
		var u = $.mobile.path.parseUrl(data.toPage),
			re = /^#browse-by/;

		if(u.hash.search(re) !== -1) {

			// We're being asked to display the items for a specific category.
			// Call our internal method that builds the content for the category
			// on the fly based on our in-memory category data structure.
			showCategory(u, data.options);

			// Make sure to tell changePage() we've handled this call so it doesn't
			// have to do anything.
			e.preventDefault();
		}
	}
});
//---End Browse By...---//

//---News Stream---//
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
		var aDate = a.endDate[1].replace(/-/g, "");
		var bDate = b.endDate[1].replace(/-/g, "");
		return aDate - bDate;
	});
	
	// Create the list to show on the page
	var newsMarkup = "<div data-role='collapsible-set' id='categoryView' data-inset='true'>";
	
	var numItemsOA = objArray.length;
	for(var i = 0; i < numItemsOA; i++) {
		newsMarkup += "<div data-role='collapsible'>";
		newsMarkup += "<h1>" + objArray[i].itemName[1] + "</h1>";
		newsMarkup += "<p class='ui-li-desc'>" + objArray[i].startDate[0] + " " + objArray[i].startDate[1] + "</p>";
		newsMarkup += "<p class='ui-li-desc'>" + objArray[i].endDate[0] + " " + objArray[i].endDate[1] + "</p>";
		newsMarkup += "<p class='ui-li-desc'>" + objArray[i].priority[0] + " " + objArray[i].priority[1] + "</p>";
		newsMarkup += "<p class='ui-li-desc'>" + objArray[i].comments[0] + " " + objArray[i].comments[1] + "</p>";
		newsMarkup += "</div>";
	}

	newsMarkup += "</div>";

	// Add the list to the page
	$('div#newsContent').html(newsMarkup);
});
//---End News Stream---//