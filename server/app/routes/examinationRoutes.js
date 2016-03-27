exports.startExam = function(Examination) {
  return function(req, res, next) {
    Examination.findOne({ examId: req.body.data.examId }, function(err, exam) {
      if(err) return console.error(err);
      if (!exam) {
        return res.json({ success: false, message: 'No examination exists for that code!' });
      }
      if (exam) {
        var now = new Date();
        exam.startTime = now;
        exam.endTime = new Date(now.getTime() + (2*1000*60*60));

        exam.save(function(err) {
          if (err) {
            console.log('error saving :(');
            console.error(err);
          } else {
            console.log('Model - Examination: startExam - Save successful ;)');
          }
        });
      }

      res.json({
        success: true
      });
    });
  };
};

exports.queryExam = function(Examination, User) {
  return function(req, res, next) {
    var result = {};
    console.log('what bro');
    Examination.findOne({ _id: req.body.examId }, function(err, exam) {
      if(err) return console.error(err);
      if (!exam) {
        return res.json({ success: false, message: 'This exam does not exist!' });
      } else {
        console.log(exam);
        User.findOne({ _id: exam.userId }, function(err, user) {
          if(err) return console.error(err);
          if (!user) {
            return res.json({ success: false, message: 'This user does not exist!' });
          } else {
            result = {
              success: true,
              examId: exam._id,
              userId: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              endTime: exam.endTime
            };
            console.log(exam)
            console.log(result);
          }
    res.json(result);
        });
      }
    });
  };
}

exports.finishExam = function(Examination){
  return function(req, res, next){
    Examination.findOne({ examId: req.body.data.examId }, function(err, exam){
      if(err) return console.error(err);
      if (!exam) {
        return res.json( {success: false, message: 'No examination exists for that code!'} );
      }
      if (exam) {
        exam.completed = 'Y';
        exam.save(function(err) {
          if (err) {
            console.log('error saving :(');
            console.error(err);
          } else {
            console.log('Model - Examination: finishExam - Save successful ;)');
          }
        });
      }

      res.json({
        success: true
      });
    });
  };
};