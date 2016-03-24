exports.startExam = function(Examination, data){
  return function(req, res, next){
      Examination.find({ emailCode: req.body.data.emailCode}, function(error, exam){
        if(error) return console.error(error);
        console.log(exam);
        res.send(exam);
      });
  };
};











