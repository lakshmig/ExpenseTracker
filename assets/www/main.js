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
	 /* startApp after device ready */
	alert("In document.ready");
	 console.log("PhoneGap is Ready");
	 childBrowser = new ChildBrowser();
    document.addEventListener("deviceready", startApp, false);
    $('#home').live('pagecreate', function(event) {
    	//getSpreadsheetData();
    });
	 //getSpreadsheetData();
  });


/**
 * Start the App
 */
function startApp() {
     alert("In startApp ");
}

function DoAuth()
{
	     alert("In DoAuth ");
	    var oAuth = liquid.helper.oauth;
	     
	    $("#access-code").click(function(event) {
	    	alert("In access code click ");
	        liquid.helper.oauth.authorize(authorizeWindowChange);
	        event.preventDefault();
	    });
	 
	     
	    if (oAuth.isAuthorized()) {
	    	alert("in isAuthorized");
	        /* get the Expense incurred page. */
	    	getSpreadsheetData();
	    }
}
	    
function authorizeWindowChange(uriLocation) {
    console.log("Location Changed: " + uriLocation); 
    var oAuth = liquid.helper.oauth;
    alert("Inside authorizewindowchange: " + uriLocation);   
    // oAuth process is successful! 
    if (oAuth.requestStatus == oAuth.status.SUCCESS) {
    	 alert("Inside authorizewindowchange requestStatus SUCCESS");
        var authCode = oAuth.authCode;
 
        // have the authCode, now save the refreshToken and start Page TaskList
        oAuth.saveRefreshToken({ 
                auth_code: oAuth.authCode
              }, function() {
            	  getSpreadsheetData();
              });
         
    } 
    else if (oAuth.requestStatus == oAuth.status.ERROR) 
    {
    	alert("Inside authorizewindowchange requestStatus ERROR");
        console.log("Error >> oAuth Processing");
    } 
    else {
        // do nothing I guess!
    }
}
 

function getSpreadsheetData(){
	alert("getSpreadsheetData");
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





