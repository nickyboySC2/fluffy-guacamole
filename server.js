var express = require("express");

var app = express();

app.use(express.static('public'));

app.get('/*', function (req, res) {
	var responseObj = {"Unix":null,"Natural":null};
	var unixRegex = /\d+/;
	var unix = req.url.substring(1).match(unixRegex)
	if (unix != req.url.substring(1)){
		var spaceReplace = req.url.split("%20").join(" ");
		var newDate = Date.parse(spaceReplace);
		if(!newDate){
			res.send(JSON.stringify(responseObj));
		}
		responseObj["Unix"]=newDate/1000;
		responseObj["Natural"]=spaceReplace.substring(1);
	}else{
		//stackoverflow
		var a = new Date(unix * 1000);
	  var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
	  var year = a.getFullYear();
	  var month = months[a.getMonth()];
	  var date = a.getDate();
	  var natural = month + ' ' + date+ ' ' + year;
	  responseObj["Unix"]=parseInt(unix[0]);
	  responseObj["Natural"]=natural;
	}
	res.end(JSON.stringify(responseObj));
});

app.listen(8888, function () {
	console.log('Example app listening on port 8888!');
});

