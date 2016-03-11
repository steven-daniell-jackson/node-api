// Require packages
var express = require('express');
var config = require('./config');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();

// Set template engine
app.set('view engine', 'ejs');

// Connect to database
mongoose.connect(config.database,function(err){

if (err) {
  console.log(err);
} else {
  console.log('Connected to database');
}

});

// Body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// Add headers
app.use(function (req, res, next) {

  var allowedOrigins = ['http://localhost', 'http://fast-ocean-20742.herokuapp.com', 'http://murmuring-caverns-76400.herokuapp.com', 'http://steven-daniell-jackson.github.io'];
  // var origin = req.headers.origin;
  // if(allowedOrigins.indexOf(origin) > -1){
  //      res.setHeader('Access-Control-Allow-Origin', origin);
  // }


    // // Website you wish to allow to connect
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Creating api
var api = require('./app/routes/api')(app, express);
app.use('/api',api);

// Homepage render using EJS
// app.get('/', function (req, res) {
//   // res.sendFile('views/homepage.html', {root: __dirname })
//   res.setHeader('Content-Type', 'application/json');
//   res.render('views/homepage.html', {test: "test"});

//   console.log("Homepage accessed");
// });



app.use(express.static(__dirname + '/public'));


// Render homepage using EJS template engine
app.get('/', function (req, res) {
 
 res.sendFile(__dirname +  '/public/app/views/index.html')
});

app.get('/api', function (req, res) {
  // res.render('api', {test: "passed data"});
  console.log("api accessed");
});

// app.get('/users', function (req, res) {
//   // res.render('users', json(users));
//   console.log("users accessed");
// });


// Invoice page
app.get('/invoice', function (req, res) {
   
});

// Search page
app.get('/search', function (req, res) {
   
});

// 404 page
app.get('*', function(req, res){
   
});


// Start server
app.listen(config.port,function(err){

	if (err) {
		console.log(err);
	} else {
		console.log('Server running on port: ' + config.port);
	}
	
});


