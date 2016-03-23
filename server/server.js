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
var mongoose = require('mongoose');
var config = require('./config');
mongoose.connect(config.database);
app.set('secret', config.secret); // sets secret variable
var User = require('./app/models/user'); // mongoose model


// ------------------------------------
// Middleware
// ------------------------------------
// use body parser to get info from POST and URL parameters
app.use(bodyParser.urlencoded( {extended: false} ));
app.use(bodyParser.json());

// use morgan to log requests to the console.
app.use(morgan('dev'));
// cookie Parser
app.use(cookieParser());


// ------------------------------------
// API Routes
// ------------------------------------
var apiRoutes = express.Router();
app.use('/api', apiRoutes);

apiRoutes.post('/startExam', function(req, res){
	console.dir('hello..  is it me? @#$@#$@#%@#$#$');
	console.dir(req.body.test);

	// 1. inserts exam record in DB
	// 2. sets start time
	// 3. sets test interval
	// 4. selects a Prompt
	// 5. returns Prompt
	res.json({
		prompt: 'Write a factorial function using recursion.'
	});

});

apiRoutes.post('/authenticate', function(req, res){
	// find user
	console.log('hello..  is it me? @#$@#$@#%@#$#$');
	console.log(req.body);

	User.findOne({name: req.body.name}, function(err, user){
		if (err) throw err;

		if (!user) {
			return res.json( {success: false, message: 'Authentication failed.  User not found!'} );
		} 
		if(user.password !== req.body.password){
			return res.json( {success: false, message: 'Authentication failed.  Wrong password!'} );
		}

		var token = jwt.sign(user, app.get('secret'), {
			expiresIn: 1440 //expires in 24hrs
		});

		res.json({
			success: true,
			message: 'Enjoy your token!',
			token: token
		});
	});
});

// route for middleware to verify token
// app.use(function(req, res, next){
// 	// check header, or url parameters, or post parameters for token
// 	var token = req.body.token || req.query.token || req.headers['x-access-token'];

// 	// decode token
// 	if (token) {
// 		// verify secret and check expiration
// 		jwt.verify(token, app.get('secret'), function(err, decoded){
// 			if (err) {
// 				return res.json( {success: false, message: 'Failed to authenticate token!'} );
// 			}

// 			req.decoded = decoded;
// 			res.cookie(token, 'cookie_value').send('Token is set as cookie');
// 			// next();
// 		});
// 	} else {
// 		return res.status(403).send({
// 			success: false,
// 			message: 'No token provided!'
// 		});
// 	}
// });

// // route to show a random message (GET http://localhost:8080/api/)
// apiRoutes.get('/', function(req, res){
// 	res.json( {message: 'Welcome to JWT HAWT API'});
// });

// // route to return all users (GET http://localhost:8080/api/users)
// apiRoutes.get('/users', function(req, res){
// 	User.find({}, function(err, users){
// 		res.json(users);
// 	});
// });


// ------------------------------------
// HTTP server
// ------------------------------------
app.listen(port);
console.log('Magic happens at http://localhost:' +port);