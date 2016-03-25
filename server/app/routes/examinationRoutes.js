exports.startExam = function(Examination){
  return function(req, res, next){
    Examination.findOne({ emailCode: req.body.data.emailCode }, function(err, exam){
      if(err) return console.error(err);
      if (!exam) {
        return res.json( {success: false, message: 'No examination exists for that code!'} );
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

exports.finishExam = function(Examination){
  console.log('finish exam func firing');
  return function(req, res, next){
    Examination.findOne({ emailCode: req.body.data.emailCode }, function(err, exam){
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