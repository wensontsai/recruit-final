exports.startExam = function(Examination) {
  return function(req, res, next) {
    Examination.findOne({ _id: req.body.data.examId }, function(err, exam) {
      console.log("wtff ");
      console.log(exam);
      if(err) return console.error(err);
      if (!exam) {
        return res.json({ success: false, message: 'No examination exists for that code!' });
      }
      if (exam) {
        var now = new Date();
        exam.startTime = now;
        exam.endTime = new Date(now.getTime() + (2*1000*60*60));
        // exam.endTime = now.setHours(now.getHours() + 2);
        console.log(exam.endTime);

        exam.save(function(err) {
          if (err) {
            console.log('error saving :(');
            console.error(err);
          } else {
            console.log('Model - Examination: startExam - Save successful ;)');
          }
        });
      }

      res.json(exam);
    });
  };
};


exports.initializeExam = function(Examination, User) {
  return function(req, res, next) {
    console.log(req.body.data.userId);
    var result = {};
    var exam = new Examination({
      userId: req.body.data.userId,
      timeAllowed: 7200000,
      startTime: '',
      endTime: '',
      completed: null
    });
    exam.save(function(error, exam){
      if(error) return console.error(error);
      
      User.findOne({ _id: req.body.data.userId }, function(err, user) {
        if(err) return console.error(err);
        if (!user) {
          return res.json({ success: false, message: 'This user does not exist!' });
        } else {

          user.currentExam = true;
          user.save(function(err) {
            if (err) {
              console.log('error saving :(');
              console.error(err);
            } else {
              console.log('Model - Users: initializeExam - Save successful ;)');
            }
          });

          result = {
            examId: exam._id
          };
          console.log(result);
        }
        res.json(result);
      });
    });
  };
}

exports.queryExam = function(Examination, User) {
  return function(req, res, next) {
    var result = {};
    Examination.findOne({ _id: req.body.examId }, function(err, exam) {
      if(err) return console.error(err);
      if (!exam) {
        return res.json({ success: false, message: 'This exam does not exist!' });
      } else {
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
              email: user.email
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
    Examination.findOne({ examId: req.body.data.examId }, function(err, exam) {
      if(err) return console.error(err);
      if (!exam) {
        return res.json( { success: false, message: 'No examination exists for that code!' } );
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