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
PORTFOLIO GET AND POST
*****************************************************/

// Get portfolio data from the database
api.get('/portfolio/', function(req,res){

  Portfolio.find({}, function(err, portfolio){

    if (err) {

     
      res.send(err);
      
      
    } else {


      var filterFunction =  function(filterQuery){
        console.log(filterQuery)

        var filteredResult = [];

        for (var x in portfolio) {


          switch (filterQuery) {

            case 'latest':
            if (portfolio[x].recent && portfolio[x].website) {
             filteredResult.push(portfolio[x]);
           }
           break;
           case 'previous':
           if (!portfolio[x].recent) {
             filteredResult.push(portfolio[x]);
           }
           case 'landingpage':
           if (portfolio[x].landingpage) {
             filteredResult.push(portfolio[x]);
           }
           case 'newsletter':
           if (portfolio[x].newsletter) {
             filteredResult.push(portfolio[x]);
           }
           case 'other':
           if (portfolio[x].other) {
             filteredResult.push(portfolio[x]);
           }
           case 'recent':
           if (portfolio[x].recent && !portfolio[x].website) {
             filteredResult.push(portfolio[x]);
           }
           break;
           
           default:
           res.send(portfolio);
         }







       }
// console.log(filteredResult);
return filteredResult;

}



res.json(filterFunction(req.query.query));
      // res.json({ query: req.query.query });


      

    }

  });

});


// // Get portfolio data from the database
// api.get('/portfolio', function(req,res){

//   Portfolio.find({}, function(err, portfolio){

//     if (err) {

//       res.send(err);


//     } else {
//       res.json ({test: "message"});
//       res.json(portfolio);

//     }

//   });

// });




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
  recent: req.body.recent,
  newsletter: req.body.newsletter,
  other: req.body.other,
  landingpage: req.body.landingpage,
  website: req.body.website,
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

