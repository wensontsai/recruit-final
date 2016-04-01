function shuffle(array) {
    var counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        var index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        var temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}
exports.queryAllPrompts = function(Prompt) {
  return function(req, res, next) {
    Prompt.find({}, function(err, prompts) {
      if(err) return console.error(err);
      var promptsShuffled = shuffle(prompts);
      res.json( promptsShuffled );
    });
  };
};
exports.queryAllPromptsList = function(Prompt) {
  return function(req, res, next) {
    Prompt.find({}, function(err, prompts) {
      if(err) return console.error(err);
      res.json( prompts );
    });
  };
};

exports.addPrompt = function(Prompt){
  return function(req, res, next){
    Prompt.findOne({ question: req.body.question }, function(err, prompt) {
      if(err) return console.error(err);
      if (prompt) {
        return res.json( {success: false, message: 'This prompt already exists!'} );
      } else {
        var prompt = new Prompt({
          question : req.body.question
        });
        prompt.save(function(err, prompt){
          if(err) return console.error(err);
          res.json(prompt);
        });
      }
    });
  };
};

// exports.editPrompt = function(Prompt){
//   return function(req, res, next){
//   console.log(req.body.promptId);
//     Prompt.findOne({ _id: req.body.promptId }, function(err, prompt) {
//       if (err)return console.error(err);
//       res.json({
//         success: true
//       })
//     });
//   };
// };

exports.deletePrompt = function(Prompt){
  return function(req, res, next){
  console.log(req.body.promptId);
    Prompt.remove({ _id: req.body.promptId }, function(err) {
      if (err) {
        return console.error(err)
      } else {
        Prompt.find({}, function(err, prompts) {
          console.log(prompts);
          if(err) return console.error(err);
          res.json( prompts );
        });
      }
    });
  };
};

