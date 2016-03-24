var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var jwt = require('jsonwebtoken');
var port = process.env.PORT || 3001;

var app = express();


// ------------------------------------
// Mongo DB Connect
// ------------------------------------
var db = require ('./db');
var config = require ('./config');

db.connect(config.database, function(err) {
  if (err) {
    console.log('Unable to connect to Mongo ! ! ! ! !')
    process.exit(1)
  } else {
    console.log("~~~ > > > Connected to MongoDB boyyÿÿÿÿÿÿ < < < ~~~");
  }
});

var User = require ('./app/models/user');
var Examination = require ('./app/models/examination');
var Prompt = require ('./app/models/prompt');

// ------------------------------------
// Middleware
// ------------------------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: false } ));
app.use(morgan('dev'));
app.use(cookieParser());


// ------------------------------------
// API Routes
// ------------------------------------
var apiRoutes = express.Router ();
app.use('/api', apiRoutes);

// start an Examination
apiRoutes.post('/startExam', function(req, res) {
	var result = {};

	console.log(req.body.data.emailCode);
	// 1. update exam record in DB, set startTime

	Examination.findOne({ 'emailCode': req.body.data.emailCode }, function (err, exam) {
    console.log(exam);

		if (err) throw err;
		// if exists
    if (exam) {
      exam.startTime = new Date();
      exam.endTime = new Date().addHours(2);

	    exam.save(function(err) {
	      if (err)
	        console.log('error')
	      else
	        console.log('success')
	    });
    }
    // if doesn't exist
		if (!exam) {
			return res.json({ success: false, message: 'Authentication failed.  Examination not found!'} );
		}
	});


	// 4. selects a Prompt
	// 5. returns Prompt
	res.json({
		result: result
	});

});


// get all users
apiRoutes.get('/users', function(req, res) {
	User.find({}, function(err, users) {
		res.json(users);
	});
});


// ------------------------------------
// HTTP server
// ------------------------------------
app.listen(port);
console.log('Magic happens at http://localhost:' +port);