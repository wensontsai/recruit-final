var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var jwt = require('jsonwebtoken');

var config = require ('./config');
var app = express();

// ~~~~~> TESTING: tests spin up test DB from individual specs <~~~~~
if (process.env.NODE_ENV === 'test') {
  var port = 3121;
  var db_success_msg = '';
  var server_success_msg = '==> 🌎  *** TEST ENV *** fired up <==';
}
else {
// Fire up DEVELOPMENT database
  var port = process.env.PORT || 3001;
  var db_success_msg = '~~~ > > > DEV ENV: Connected to MongoDB boyyÿÿÿÿÿÿ < < < ~~~';
  var server_success_msg = '==> 🌎  DEV ENV: Magic is happening at http://localhost:' +port;

  // ------------------------------------
  // Mongo DB Connect
  // ------------------------------------
  mongoose.connect(config.db.dev, function(err){
    if(err){
      console.log('connection error', err);
    } else {
      console.log(db_success_msg);
    }
  });
  app.set('secret', config.secret); // sets secret variable
}

// ------------------------------------
// Mongoose - Models
// ------------------------------------
var User = require('./app/models/user');
var Prompt = require('./app/models/prompt');
var Examination = require('./app/models/examination');
var Answer = require('./app/models/answer');

// ------------------------------------
// Middleware
// ------------------------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: false } ));
// app.use(morgan('dev'));
app.use(cookieParser());


// ------------------------------------
// API Routes
// ------------------------------------
var apiRoutes = express.Router ();
app.use('/api', apiRoutes);

var promptRoutes = require('./app/routes/promptRoutes');
var examinationRoutes = require('./app/routes/examinationRoutes');
var answerRoutes = require('./app/routes/answerRoutes');
var userRoutes = require('./app/routes/userRoutes');

// ::::: GET :::::
apiRoutes.get('/queryAllPrompts', promptRoutes.queryAllPrompts(Prompt));
apiRoutes.get('/queryAllPromptsList', promptRoutes.queryAllPromptsList(Prompt));
apiRoutes.get('/queryAllCandidates', userRoutes.queryAllUsers(User));

// ::::: POST :::::
apiRoutes.post('/submitAnswer', answerRoutes.submitAnswer(Answer, Prompt));
apiRoutes.post('/queryCandidateAnswers', answerRoutes.queryCandidateAnswers(Answer, User));
apiRoutes.post('/queryExam', examinationRoutes.queryExam(Examination, User));
apiRoutes.post('/initializeExam', examinationRoutes.initializeExam(Examination, User));
apiRoutes.post('/startExam', examinationRoutes.startExam(Examination));
apiRoutes.post('/finishExam', examinationRoutes.finishExam(Examination, User));
apiRoutes.post('/addPrompt', promptRoutes.addPrompt(Prompt));
apiRoutes.post('/addPrompt', promptRoutes.addPrompt(Prompt));
apiRoutes.post('/editPrompt', promptRoutes.editPrompt(Prompt));
apiRoutes.post('/deletePrompt', promptRoutes.deletePrompt(Prompt));
apiRoutes.post('/addCandidate', userRoutes.addUser(User));


// ------------------------------------
// HTTP server
// ------------------------------------
app.listen(port);
console.log(server_success_msg);

module.exports = app;