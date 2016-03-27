exports.submitAnswer = function(Answer){
  return function(req, res, next){
    console.log(req.body);
    Answer.findOne({ examId: req.body.examId, promptId: req.body.promptId }, function(err, answer){
      if(err) return console.error(err);
      // if (answer) {
      //   return res.json( {success: false, message: 'This question has already been answered for this exam session!'} );
      // } else {
        var now = new Date();

        var answer = new Answer({
          userId : req.body.userId,
          examId : req.body.examId,
          promptId : req.body.promptId,
          answer : req.body.answer,
          endTime : now
        });

        answer.save(function(err, answer) {
          if(err) return console.error(err);
          res.json(answer);
        });
      // }
    });
  };
};