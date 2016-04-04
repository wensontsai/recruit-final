var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var jwt = require('jsonwebtoken');
var port = 3121;

var app = express();

// ------------------------------------
// Mongo DB Connect
// ------------------------------------
var config = require ('./config_test');

mongoose.connect(config.database, function(err) {
  if(err) {
    console.log('connection error', err);
  } else {
    console.log('~~~ > > > Connected to *** TEST DATABASE *** MongoDB boyyÿÿÿÿÿÿ < < < ~~~');
  }
});
app.set('secret', config.secret); // sets secret variable


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
apiRoutes.get('/queryAllPrompts', 'http://localhost:3001/queryAllPrompts');
// apiRoutes.get('/queryAllPromptsList', promptRoutes.queryAllPromptsList(Prompt));
// apiRoutes.get('/queryAllCandidates', userRoutes.queryAllUsers(User));

// // ::::: POST :::::
// apiRoutes.post('/submitAnswer', answerRoutes.submitAnswer(Answer, Prompt));
// apiRoutes.post('/queryCandidateAnswers', answerRoutes.queryCandidateAnswers(Answer, User));
// apiRoutes.post('/queryExam', examinationRoutes.queryExam(Examination, User));
// apiRoutes.post('/initializeExam', examinationRoutes.initializeExam(Examination, User));
// apiRoutes.post('/startExam', examinationRoutes.startExam(Examination));
// apiRoutes.post('/finishExam', examinationRoutes.finishExam(Examination, User));
// apiRoutes.post('/addPrompt', promptRoutes.addPrompt(Prompt));
// apiRoutes.post('/addPrompt', promptRoutes.addPrompt(Prompt));
// apiRoutes.post('/editPrompt', promptRoutes.editPrompt(Prompt));
// apiRoutes.post('/deletePrompt', promptRoutes.deletePrompt(Prompt));
// apiRoutes.post('/addCandidate', userRoutes.addUser(User));


// ------------------------------------
// HTTP server
// ------------------------------------
app.listen(port);
console.log('==> 🌎  Magic is happening at *** TEST SERVER *** http://localhost:' +port);

module.exports = app;