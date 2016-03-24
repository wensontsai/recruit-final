exports.startExam = function(Examination, data){
  return function(req, res, next){
    // Examination.find({ emailCode: req.body.data.emailCode}, function(error, exam){
    //   if(error) return console.error(error);
    //   console.log(exam);
    //   res.send(exam);
    // });

    var result = {};

    Examination.findOne({ emailCode: req.body.data.emailCode }, function(err, exam){
      if(err) return console.error(err);
      if (!exam) {
        return res.json( {success: false, message: 'No examination exists for that code!'} );
      }
      if (exam) {
        console.log(exam);

        var now = new Date();
        exam.startTime = now;
        exam.endTime = new Date(now.getTime() + (2*1000*60*60));

        exam.save(function(err) {
          if (err) {
            console.log('error saving :(');
            console.log(err);
          } else {
            console.log('saving successful ;)');
          }
        });
      }

      res.json({
        success: true,
        result: result
      });
    });
  };
};











