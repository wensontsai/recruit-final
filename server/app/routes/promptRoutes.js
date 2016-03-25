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
  return function(req, res, next){
    Prompt.find({}, function(err, prompts) {
      if(err) return console.error(err);
      var promptsShuffled = shuffle(prompts);
      res.json( promptsShuffled );
    });
  };
};