var autofillData = function() {
		//The JSON data used for this is in the json.js file
		for(var n in json) {
			var id = Math.floor(Math.random() * 1000000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	};

var storeData = function(data, key) {
		var id = typeof key !== 'undefined' ? key : Math.floor(Math.random() * 1000000001);
		data[5].value = typeof data[5].value !== 'undefined' ? data[5].value : "";

		//Gather data from form and store in an object
		//Object properties contain array with the form label and value
		var item = {};
		item.startDate = ["Start Date:", data[0].value];
		item.endDate = ["End Date:", data[1].value];
		item.itemName = ["Item Name:", data[2].value];
		item.category = ["Category:", data[3].value];
		item.priority = ["Priority:", data[4].value];
		item.comments = ["Comments:", data[5].value];

		//Save data into local storage using Stringify
		localStorage.setItem(id, JSON.stringify(item));
		$('<div>').simpledialog2({
			mode: 'blank',
			headerText: 'Task Saved',
			zindex: 1000,
			blankContent :
				"<ul data-role='listview'><li><img src='./img/success64.png' />The task has been saved successfully!</li>"+
				"<a rel='close' data-role='button' href='#'>Close</a>",
			callbackClose: refreshPage
		});
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
		$('#editComments').val(item.comments[1]);
		$('#hiddenKey').val(itemKey);
		
		$.mobile.changePage($('#editItem'));
	};


var deleteItem = function(urlObj, options) {
		var itemKey = urlObj.hash.replace(/.*delete=/, ""),
			pageSelector = urlObj.hash.replace(/\?.*$/, "");
		$('<div>').simpledialog2({
			mode: 'button',
			headerText: 'Delete Task',
			zindex: 1000,
			buttonPrompt: "<ul data-role='listview'><li><img src='./img/warning.png' />Are you sure you want to delete this task?</li>",
			buttons : {
				'OK': { click: function () {
						localStorage.removeItem(itemKey);
						refreshPage();
					}
				},
				'Cancel': { click: function () {
						this.close();
						refreshPage();
					},
					icon: "delete",
					theme: "c"
				}
			}
		});
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
	if(typeof data.toPage === "string") {
		var u = $.mobile.path.parseUrl(data.toPage),
			re = /^#delItem/,
			reTwo = /^#editItem/;

		if(u.hash.search(re) !== -1) {
			deleteItem(u, data.options);
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
		$('<div>').simpledialog2({
			mode: 'button',
			headerText: 'Delete All',
			zindex: 1000,
			buttonPrompt: "<ul data-role='listview'><li><img src='./img/warning.png' />Are you sure you want to delete all tasks?</li>",
			buttons : {
				'OK': { click: function () {
						localStorage.clear();
						refreshPage();
					}
				},
				'Cancel': { click: function () {
						this.close();
						refreshPage();
					},
					icon: "delete",
					theme: "c"
				}
			}
		});
	});
});

$('#homePage').on('pagebeforeshow', function() {
	if (localStorage.length === 0) {
		$('<div>').simpledialog2({
			mode: 'button',
			headerText: 'No Data',
			zindex: 1000,
			buttonPrompt: 'You have nothing to do. Would you like to load sample data?',
			buttons : {
				'OK': { click: function () {
						autofillData();
					}
				},
				'Cancel': { click: function () {
						this.close();
					},
					icon: "delete",
					theme: "c"
				}
			}
		});
	}
});

$('#addItem').on('pageinit', function () {
	var myForm = $('#todoForm');
	myForm.validate({
		invalidHandler: function(form, validator) {},
		submitHandler: function() {
			var data = myForm.serializeArray();
			storeData(data);
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
		}
	});
});