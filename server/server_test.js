var express = require('express');
var config = require ('./config');
var app = express();

// ------------------------------------
// Mongoose - Models
// ------------------------------------
var User = require('./app/models/user');
var Prompt = require('./app/models/prompt');
var Examination = require('./app/models/examination');
var Answer = require('./app/models/answer');

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

module.exports = app;
