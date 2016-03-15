var Task = require('../models/task');
var Portfolio = require('../models/portfolio');
var config = require('../../config');
var secretKey = config.secretKey;


// Export API
module.exports = function(app, express){

  var api = express.Router();

/*****************************************************
DAIRY GET AND POST
*****************************************************/


// Get tasks data from the database
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

/*****************************************************
END DAIRY GET AND POST
*****************************************************/


/*****************************************************
PORTFOLIo GET AND POST
*****************************************************/


// Get tasks data from the database
api.get('/portfolio', function(req,res){

  Portfolio.find({}, function(err, tasks){

    if (err) {

      res.send(err);
      
      
    } else {
      res.json(tasks);

    }

  });

});



// Post data to the database
api.post('/add-portfolio', function(req, res){

// Debug
// console.log(req.body.url)


var portfolio = new Portfolio({

clientName: req.body.clientname,
  platform: req.body.platform,
  url: req.body.url,
  imgsrc: req.body.imgsrc,
  workDone: req.body.workdone,
  date: req.body.date,
  newsletter: req.body.newsletter,
  other: req.body.other,
  landingpage: req.body.landingpage,
  comments: req.body.comments
});



portfolio.save(function(err){
  if (err) {
    res.send(err);
    return
  }

  res.json({message:'Entry saved'});

});


});
/*****************************************************
END PORTFOLIO GET AND POST
*****************************************************/

return api;

}

