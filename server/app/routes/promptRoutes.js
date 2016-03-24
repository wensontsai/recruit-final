exports.queryAllPrompts = function(Prompt){
  return function(req, res, next){
    Prompt.find({}, function(err, prompt){
      if(err) return console.error(err);
      res.json(prompt);
    });
  };
};