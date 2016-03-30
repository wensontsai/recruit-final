var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var jwt = require('jsonwebtoken');
var port = process.env.PORT || 3001;

var app = express();


// ------------------------------------
// Mongo DB Connect
// ------------------------------------
var config = require ('./config');

mongoose.connect(config.database, function(err){
  if(err){
    console.log('connection error', err);
  } else {
    console.log('~~~ > > > Connected to MongoDB boyyÿÿÿÿÿÿ < < < ~~~');
  }
});
app.set('secret', config.secret); // sets secret variable


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
apiRoutes.get('/queryAllCandidates', userRoutes.queryAllUsers(User));

// ::::: POST :::::
apiRoutes.post('/submitAnswer', answerRoutes.submitAnswer(Answer, Prompt));
apiRoutes.post('/queryCandidateAnswers', answerRoutes.queryCandidateAnswers(Answer, User));
apiRoutes.post('/queryExam', examinationRoutes.queryExam(Examination, User));
apiRoutes.post('/initializeExam', examinationRoutes.initializeExam(Examination, User));
apiRoutes.post('/startExam', examinationRoutes.startExam(Examination));
apiRoutes.post('/finishExam', examinationRoutes.finishExam(Examination));
apiRoutes.post('/addCandidate', userRoutes.addUser(User));


// ------------------------------------
// HTTP server
// ------------------------------------
app.listen(port);
console.log('==> 🌎  Magic is happening at http://localhost:' +port);

module.exports = app;