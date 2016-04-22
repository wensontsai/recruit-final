var Notifications = require('../notifications');

exports.submitAnswer = function(Answer, Prompt, Examination) {
  var answeredPrompts = [];

  return function(req, res, next) {
    var now = new Date();
    var results = {};
    var messagesArray = [];
    var promptText = '';

    Prompt.findOne({ _id: req.body.promptId }, function(err, prompt) {
      promptText = prompt.question;
    });
    Examination.findOne({ _id: req.body.examId }, function(err, exam) {
      exam.answeredPrompts.push(req.body.promptId);

      if(exam.answeredPrompts.length === exam.questionsTotal) {
        exam.completed = 'Y';
      }

      exam.save(function(err, exam) {
        if(err) return console.error(err);
          Answer.findOne({ examId: req.body.examId, promptId: req.body.promptId }, function(err, answer) {
            if(err) return console.error(err);
            if (answer) {
              Notifications.prepareMessagesArray(messagesArray, 'This question has already been answered for this exam session!');
              return res.status(500).json({
                error:
                  { messagesArray: messagesArray,
                  }
              });
            } else {

               var answer = new Answer({
                userId : req.body.userId,
                examId : req.body.examId,
                promptId : req.body.promptId,
                prompt: promptText,
                answer : req.body.answer,
              });

              answer.save(function(err, answer) {
                if(err) return console.error(err);

                results = {
                  userId : req.body.userId,
                  examId : req.body.examId,
                  promptId : req.body.promptId,
                  prompt: promptText,
                  answer : req.body.answer,
                  answeredPrompts : exam.answeredPrompts,
                  completed : exam.completed
                };
                res.json(results);
              });
            }
          });
      });
    });
  };
};
exports.queryCandidateAnswers = function(Answer, User) {
  return function(req, res, next) {
    var results = {};

    Answer.find({ userId: req.params.userId })
      .exec()
      .then (function(answers) {
        results['allAnswers'] = answers;

        return User.findOne({ _id: req.params.userId })
          .exec()
          .then (function(user) {
            results['userId'] = req.params.userId;
            results['firstName'] = user.firstName;
            results['lastName'] = user.lastName;
            results['email'] = user.email;
            return results;
          }, function(err) {
              console.error('User query error => ', err);
              res.status(500).send(err);
          })
      }, function(err) {
          console.error('Answer query error => ', err);
          res.status(500).send(err);
      })
      .then(function() {
        res.json(results);
      })
  };
};