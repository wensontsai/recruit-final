exports.startExam = function(Examination){
  return function(req, res, next){
      Examination.find({ emailCode: 'xxxxx'}, function(error, exam){
        if(error) return console.error(error);
        console.log(exam);
        res.send(exam);
      });
  };
};











