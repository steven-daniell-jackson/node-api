var Task = require('../models/task');
var config = require('../../config');
var secretKey = config.secretKey;


// Export API
module.exports = function(app, express){

  var api = express.Router();


// Get invoices data from the database
api.get('/tasks', function(req,res){

  Task.find({}, function(err, tasks){

    if (err) {

      res.send(err);
      
      
    } else {
      res.json(tasks);

    }

  });

});

// Post data to the database
api.post('/new-task', function(req, res){

// Debug
// console.log(req.body.url)


var task = new Task({

  platform: req.body.platform,
  clientName: req.body.clientname,
  url: req.body.url,
  workDone: req.body.workdone,
  monthFilter:req.body.monthfilter,
  yearFilter:req.body.yearfilter,
  date: req.body.date,
  comments: req.body.comments
});



task.save(function(err){
  if (err) {
    res.send(err);
    return
  }

  res.json({message:'Entry saved'});

});


});




return api;

}

