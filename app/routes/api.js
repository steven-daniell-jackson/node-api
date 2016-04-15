var Task = require('../models/task');
var Portfolio = require('../models/portfolio');
var Code = require('../models/code');
var TaskManager = require('../models/task-manager');
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
           if (!portfolio[x].recent && portfolio[x].website) {
             filteredResult.push(portfolio[x]);
           }
           break;
           case 'landingpage':
           if (portfolio[x].landingpage) {
             filteredResult.push(portfolio[x]);
           }
           break;
           case 'newsletter':
           if (portfolio[x].newsletter) {
            // console.log(portfolio[x]);
            filteredResult.push(portfolio[x]);
            console.log(filteredResult);
          }
          break;
          case 'other':
          if (portfolio[x].other) {
           filteredResult.push(portfolio[x]);
         }
         break;
         case 'recent':
         if (portfolio[x].recent && !portfolio[x].website) {
           filteredResult.push(portfolio[x]);
         }
         break;

         default:
         res.send(portfolio);
       }


     }
     console.log(filteredResult);
     return filteredResult;

   }

   res.json(filterFunction(req.query.query));
      // res.json({ query: req.query.query });

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


/*****************************************************
CODE GET AND POST
*****************************************************/


// Get code data from the database
api.get('/code', function(req,res){
    
var location = req.query.location;
var locationSplit = location.split("/")
var filteredCategory = [];

console.log(locationSplit)

  Code.find({}, function(err, code){

    if (err) {
      res.send(err);
      
      
    } else {
       

    //    Loop through code data and return the results based on the window location
       for (x in code){
           
           if (code[x].category){
           if (code[x].category.toLowerCase() == locationSplit[0].toLowerCase()) {
              
              if (code[x].subCategory.toLowerCase() == locationSplit[1].toLowerCase())
               filteredCategory.push(code[x]);
               
           }
           }
           
       }
       
       (filteredCategory.length > 0) ? res.json(filteredCategory) : res.json({message:'No results found'});
       
       
    //    console.log(filteredCategory);
       
    //   console.log(code) 
    //   res.json(code);

    }

  });

});

// Get code data from the database
api.get('/all-code-entries', function(req,res){  

  Code.find({}, function(err, code){

    if (err) {
      res.send(err);
      
      
    } else {
       
      res.json(code);

    }

  });

});

// Post data to the database
api.post('/new-code', function(req, res){

var code = new Code({

  codeTitle: req.body.codeTitle,
  codeDescription: req.body.codeDescription,
  codeSource: req.body.codeSource,
  codeImg: req.body.codeImg,
  codeDemo: req.body.codeDemo,
  category: req.body.category,
  subCategory: req.body.subCategory


});



code.save(function(err){
  if (err) {
    res.send(err);
    return
  }

  res.json({message:'Code added'});

});


});

/*****************************************************
END CODE GET AND POST
*****************************************************/


/*****************************************************
TASK MANAGER
*****************************************************/

// Get task manager data from the database
api.get('/task-manager', function(req,res){  

  TaskManager.find({}, function(err, code){

    if (err) {
      res.send(err);
      
      
    } else {
       
      res.json(code);

    }

  });
  

});


// Post task manager data to the database
api.post('/task-manager/update', function(req, res){

// console.log(req);

var taskManager = new TaskManager({

id: req.body._id,
taskTitle: req.body.taskTitle,
archived: req.body.archived,
checked: req.body.checked,
deleted: req.body.deleted,

});


console.log(taskManager);

// taskManager.save(function(err){
//   if (err) {
//     res.send(err);
//     return
//   }

//   res.json({message:'Task Manager Entry added'});

// });


});


// Post task manager data to the database
api.post('/new-task-manager', function(req, res){


var taskManager = new TaskManager({

  taskTitle: req.body.taskTitle,
  archived: req.body.archived,
  deleted: req.body.deleted,
  checked: req.body.checked


});


taskManager.save(function(err){
  if (err) {
    res.send(err);
    return
  }

  res.json({message:'Task Manager Entry added'});

});


});

/*****************************************************
END TASK MANAGER GET AND POST
*****************************************************/




return api;

}


