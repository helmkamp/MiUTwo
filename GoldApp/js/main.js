var autofillData = function() {
		//The JSON data used for this is in the json.js file
		for(var n in json) {
			var id = Math.floor(Math.random() * 1000000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	};

var storeData = function(data, key) {
		var id = typeof key !== 'undefined' ? key : Math.floor(Math.random() * 1000000001);
		data[6].value = typeof data[6].value !== 'undefined' ? data[6].value : "";

		//Gather data from form and store in an object
		//Object properties contain array with the form label and value
		var item = {};
		item.startDate = ["Start Date:", data[0].value];
		item.endDate = ["End Date:", data[1].value];
		item.itemName = ["Item Name:", data[2].value];
		item.category = ["Category:", data[3].value];
		item.priority = ["Priority:", data[4].value];
		item.highlighted = ["Highlighted:", data[5].value];
		item.comments = ["Comments:", data[6].value];

		//Save data into local storage using Stringify
		localStorage.setItem(id, JSON.stringify(item));
		// window.location.reload();
		alert("Item Saved");
	};

var editItem = function(urlObj, options) {
		var itemKey = urlObj.hash.replace(/.*edit=/, ""),
			pageSelector = urlObj.hash.replace(/\?.*$/, ""),
			//Get data from our item from local storage
			value = localStorage.getItem(itemKey),
			item = JSON.parse(value);

			//populate with current values
			$('#editStart').val(item.startDate[1]);
			$('#editEnd').val(item.endDate[1]);
			$('#editName').val(item.itemName[1]);
			$('#editCategory').val(item.category[1]);
			$('#editPriority').val(item.priority[1]);
			if(item.highlighted[1] === "Yes") {
				$('#editHighlight').attr("checked", "checked");
			}
			$('#editComments').val(item.comments[1]);
			$('#hiddenKey').val(itemKey);
			console.log(item);
		
		
		$.mobile.changePage($('#editItem'));
	};


var deleteItem = function(urlObj, options) {
		var itemKey = urlObj.hash.replace(/.*delete=/, ""),
			pageSelector = urlObj.hash.replace(/\?.*$/, ""),
			ask = confirm("Are you sure you want to delete this item?");
		console.log(itemKey);
		if(ask) {
			localStorage.removeItem(itemKey);
			refreshPage();
			alert("Item has been deleted.");
		} else {
			refreshPage();
			alert("The item has not been deleted.");
		}
	};

// This function was created by Scott W. Bradley
// http://scottwb.com/blog/2012/06/29/reload-the-same-page-without-blinking-on-jquery-mobile/
function refreshPage() {
	$.mobile.changePage(
	window.location.href, {
		allowSamePageTransition: true,
		transition: 'none',
		showLoadMsg: false,
		reloadPage: true
	});
}

$('#cancelEdit').click(function() {
	history.back();
	return false;
});

// Listen for any attempts to call changePage().
$(document).on("pagebeforechange", function(e, data) {

	// We only want to handle changePage() calls where the caller is
	// asking us to load a page by URL.
	if(typeof data.toPage === "string") {

		// We are being asked to load a page by URL, but we only
		// want to handle URLs that request the data for a specific
		// category.
		var u = $.mobile.path.parseUrl(data.toPage),
			re = /^#delItem/,
			reTwo = /^#editItem/;

		if(u.hash.search(re) !== -1) {

			// We're being asked to display the items for a specific category.
			// Call our internal method that builds the content for the category
			// on the fly based on our in-memory category data structure.
			deleteItem(u, data.options);

			// Make sure to tell changePage() we've handled this call so it doesn't
			// have to do anything.
			e.preventDefault();
		}
		if(u.hash.search(reTwo) !== -1) {
			editItem(u, data.options);
			e.preventDefault();
		}
	}
});

$('#browse-by').on('pageinit', function() {
	
	$('#deleteAll').on('click', function() {
		var del = confirm("Are you sure you want to delete all data?");
		if((del) && (localStorage.length >= 1)) {
			localStorage.clear();
			alert("All data has been cleared.");
			$.mobile.changePage($('#homePage'));
			return false;
		} else if((!del) && (localStorage.length >= 1)) {
			alert("No data has been cleared.");
			refreshPage();
		}
	});
});

$('#homePage').on('pageinit', function() {
	//code needed for home page goes here
	if (localStorage.length === 0) {
		var addData = confirm("There is no data to display. Add test data?");
		if (addData) {
			autofillData();
		}
	}
});

$('#addItem').on('pageinit', function () {
	var myForm = $('#todoForm');
	myForm.validate({
		invalidHandler: function(form, validator) {},
		submitHandler: function() {
			var data = myForm.serializeArray();
			storeData(data);
			refreshPage();
		}
	});
});

$('#editItem').on('pageinit', function () {
	var myForm = $('#editForm'),
		key = $('#hiddenKey').val();
	myForm.validate({
		invalidHandler: function(form, validator) {},
		submitHandler: function() {
			var data = myForm.serializeArray();
			storeData(data, key);
			refreshPage();
		}
	});
});