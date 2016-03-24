exports.queryAllPrompts = function(Prompt){
  return function(req, res, next){
      // Prompt.find(function(error, prompt){
      //   if(error) return console.error(error);
      //   res.send(prompt);
      // });

    Prompt.find({}, function(err, prompt){
      if(err) return console.error(err);
      console.log(prompt);
      res.send(prompt);
    });
  };
};