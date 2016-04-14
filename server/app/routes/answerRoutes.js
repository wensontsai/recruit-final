exports.submitAnswer = function(Answer, Prompt, Examination) {
  var promptText = '';
  var answeredPrompts = [];
  var now = new Date();

  return function(req, res, next){
    Prompt.findOne({ _id: req.body.promptId }, function(err, prompt){
      promptText = prompt.question;
    });
    Examination.findOne({ _id: req.body.examId }, function(err, exam){
      exam.answeredPrompts.push(req.body.promptId);
      answeredPrompts = exam.answeredPrompts;

      exam.save(function(err, exam) {
        if(err) return console.error(err);
      });
    });

    Answer.findOne({ examId: req.body.examId, promptId: req.body.promptId }, function(err, answer) {
      if(err) return console.error(err);
      if (answer) {
        return res.json( {success: false, message: 'This question has already been answered for this exam session!'} );
      } else {

         var answer = new Answer({
          userId : req.body.userId,
          examId : req.body.examId,
          promptId : req.body.promptId,
          prompt: promptText,
          answer : req.body.answer,
          answeredPrompts: answeredPrompts,
          endTime : now
        });

        answer.save(function(err, answer) {
          if(err) return console.error(err);
          res.json(answer);
        });
      }
    });
  };
};
exports.queryCandidateAnswers = function(Answer, User) {
  var results = {};
  return function(req, res, next){
    Answer.find({ userId: req.body.userId }, function(err, answers) {
      if(err) return console.error(err);
      User.findOne({ _id: req.body.userId }, function(err, user) {
        if(err) return console.error(err);
        results = {
          userId: req.body.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          allAnswers: answers,
        };
        res.json(results);
      });
    });
  };
};