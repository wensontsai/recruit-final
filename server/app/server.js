var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var jwt = require('jsonwebtoken');

var config = require ('../config');
var app = express();

// ~~~~~> TESTING: tests spin up test DB from individual specs <~~~~~
if (process.env.NODE_ENV === 'test') {
  var port = 3121;
  var db_success_msg = '';
  var server_success_msg = '==> 🌎  *** TEST ENV *** fired up <== on port: ' +port;
}
else {
// Fire up DEVELOPMENT database
  var port = process.env.PORT || 3001;
  var db_success_msg = '~~~ > > > DEV ENV: Connected to MongoDB boyyÿÿÿÿÿÿ < < < ~~~';
  var server_success_msg = '==> 🌎  DEV ENV: Magic is happening at http://localhost:' +port;

  // ------------------------------------
  // Mongo DB Connect
  // ------------------------------------
  mongoose.connect(config.db.dev, function(err) {
    if(err) {
      console.log('connection error', err);
    } else {
      console.log(db_success_msg);
    }
  });
  app.set('secret', config.secret); // sets secret variable
}

// ------------------------------------
// Middleware
// ------------------------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: false } ));
// app.use(morgan('dev'));
app.use(cookieParser());


// JWT Token Verification for Admin Routes
function isAuthenticated(req, res, next) {
  // check header, or url parameters, or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token
  if (token) {
    // verify secret and check expiration
    jwt.verify(token, app.get('secret'), function(err, decoded) {
      if (err) {
        return res.json( { success: false, message: 'Failed to authenticate token!' } );
      }
      req.decoded = decoded;
      console.log('token decoded successfully ->');
      next();
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided!'
    });
  }

}


// ------------------------------------
// Mongoose - Models
// ------------------------------------
var User = require('./models/user');
var Prompt = require('./models/prompt');
var Examination = require('./models/examination');
var Answer = require('./models/answer');
var Session = require('./models/session');

// ------------------------------------
// API Routes
// ------------------------------------
var apiRoutes = express.Router ();
app.use('/api', apiRoutes);

var promptRoutes = require('./routes/promptRoutes');
var examinationRoutes = require('./routes/examinationRoutes');
var answerRoutes = require('./routes/answerRoutes');
var userRoutes = require('./routes/userRoutes');
var sessionRoutes = require('./routes/sessionRoutes');

// ::::: GET :::::
apiRoutes.get('/queryCandidateAnswers/:userId', isAuthenticated, answerRoutes.queryCandidateAnswers(Answer, User));
apiRoutes.get('/queryExam/:examId', examinationRoutes.queryExam(Examination, User));
apiRoutes.get('/queryAllPrompts', promptRoutes.queryAllPrompts(Prompt));
apiRoutes.get('/queryAllPromptsList', isAuthenticated, promptRoutes.queryAllPromptsList(Prompt));
apiRoutes.get('/queryAllCandidates', isAuthenticated, userRoutes.queryAllUsers(User));

// ::::: POST :::::
apiRoutes.post('/submitAnswer', answerRoutes.submitAnswer(Answer, Prompt, Examination));
apiRoutes.post('/initializeExam', examinationRoutes.initializeExam(Examination, User));
apiRoutes.post('/startExam', examinationRoutes.startExam(Examination));
apiRoutes.post('/finishExam', examinationRoutes.finishExam(Examination, User));
apiRoutes.post('/addPrompt', isAuthenticated, promptRoutes.addPrompt(Prompt));
apiRoutes.post('/addCandidate', isAuthenticated, userRoutes.addUser(User));
apiRoutes.post('/loginUser', sessionRoutes.loginUser(User, Session));
apiRoutes.post('/logoutUser', isAuthenticated, sessionRoutes.logoutUser(User, Session));
apiRoutes.post('/authenticateUser', sessionRoutes.authenticateUser(User, Session));
apiRoutes.post('/editPrompt', isAuthenticated, promptRoutes.editPrompt(Prompt));

// ::::: DELETE :::::
apiRoutes.delete('/deletePrompt/:promptId', isAuthenticated, promptRoutes.deletePrompt(Prompt));


// ------------------------------------
// HTTP server
// ------------------------------------
app.listen(port);
console.log(server_success_msg);

module.exports = app;