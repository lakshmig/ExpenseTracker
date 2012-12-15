// A world of Global variables
var names = ["Amit","Ashish","Kriti","Lakshmi","Shilpa","Shruti"];

function onDeviceReady() {
	//document.addEventListener("resume", onResume, false);
}

function onResume() {
	// App is stopped and started
	 
}


$(document).bind( "pagebeforechange", function( e, data ) {
});

function fetchImage(ele) {
    navigator.camera.getPicture(function (imageData) {
    	var image = document.getElementById(ele);
        image.src = "data:image/jpeg;base64," + imageData;
    }, function (message) {
        alert('Camera Failure: ' + message);
    }, {
        quality: 25
    });
}




$(document).ready(function() {
	 getSpreadsheetData();
  });

function getSpreadsheetData(){
	$('#rightNow').empty();
	$.getJSON("https://spreadsheets.google.com/feeds/cells/0AvY_HmizzMsjdFA2YmRiZGdhenNjcFFJQnJfd3RUWWc/od6/public/basic?min-col=4&max-col=9&min-row=3&max-row=3&alt=json",
			 function(data) {
						 $.each(data.feed.entry, function(i,entries){
							// $('#rightNow').append('<p class="label label-success">' + names[i] + ': ' + entries.content.$t + '</p>');
							  if (entries.content.$t > 0) {
								  $('#rightNow').append('<h5>' + names[i] + ' <span class="badge badge-success pull-right">'+ entries.content.$t +'</span></h5>');
							  }else {
								  $('#rightNow').append('<h5>' + names[i] + ' <span class="badge badge-important pull-right">'+ entries.content.$t +'</span></h5>');
							  }
							 
						 });
					 });
}





