var Notifications = require('../notifications');

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

// Route used during examinations
exports.queryAllPrompts = function(Prompt) {
  return function(req, res, next) {
    Prompt.find({}, function(err, prompts) {
      if(err) return console.error(err);
      var promptsShuffled = shuffle(prompts);
      res.json( promptsShuffled );
    });
  };
};

// Route used for Admin dashboard
exports.queryAllPromptsList = function(Prompt) {
  var results = {};
  return function(req, res, next) {
    Prompt.find({}, function(err, prompts) {
      if(err) return console.error(err);
      var editObj = {};

      for(var key in prompts) {
          if (prompts.hasOwnProperty(key)) {
            editObj[prompts[key]._id] = {
              mode: null,
              data: prompts[key].question
            };
          }
      }
      results = {
        prompts,
        editObj
      }
      res.json( results );
    });
  };
};
exports.addPrompt = function(Prompt) {
  return function(req, res, next) {
    var messagesArray = [];

    Prompt.findOne({ question: req.body.question }, function(err, prompt) {
      if(err) return console.error(err);
      if (prompt) {
        Notifications.prepareMessagesArray(messagesArray, 'This prompt already exists!');
        return res.status(500).json({
          error:
            { messagesArray: messagesArray,
            }
        });
      } else {
        var prompt = new Prompt({
          question : req.body.question
        });
        prompt.save(function(err, prompt) {
          if(err) return console.error(err);
          res.json(prompt);
        });
      }
    });
  };
};
exports.editPrompt = function(Prompt) {
  return function(req, res, next) {
    var results = {};

    Prompt.findOne({ _id: req.body.id }, function(err, prompt) {
      prompt.question = req.body.question;
      prompt.save(function(err, prompt) {
        if(err) {
          return console.error(err)
        } else {
          Prompt.find({}, function(err, prompts) {
            if(err) return console.error(err);
            var editObj = {};

            for(var key in prompts) {
                if (prompts.hasOwnProperty(key)) {
                  editObj[prompts[key]._id] = {
                    mode: null,
                    data: prompts[key].question
                  };
                }
            }
            results = {
              prompts,
              editObj
            }
            res.json( results );
          });      
        }

      });
    });
  };
};
exports.deletePrompt = function(Prompt) {
  return function(req, res, next) {
    var results = {};
    
    Prompt.remove({ _id: req.params.promptId }, function(err) {
      if (err) {
        return console.error(err)
      } else {
        Prompt.find({}, function(err, prompts) {
          if(err) return console.error(err);
          var editObj = {};

          for(var key in prompts) {
              if (prompts.hasOwnProperty(key)) {
                editObj[prompts[key]._id] = {
                  mode: null,
                  data: prompts[key].question
                };
              }
          }
          results = {
            prompts,
            editObj
          }
          res.json( results );
        });
      }
    });
  };
};

