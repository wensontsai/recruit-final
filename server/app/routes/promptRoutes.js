exports.getAllPrompts = function(Prompt){
  return function(req, res, next){
      Prompt.find(function(error, prompt){
        if(error) return console.error(error);
        res.send(prompt);
      });
  };
};