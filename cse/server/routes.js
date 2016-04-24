var express = require('express');
var router = express.Router();

// see searchers directory for
// back-end client implementations
var web = require('./searchers').web;
var loc = require('./searchers').loc;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html');
});


// google search api route
router.get('/ws/:q', (req, res, next) => {
  web.search(req.params.q, (err, data) => {
    console.log(data);
  	if(err) send_err(res, err);
  	else {
      web.search(req.params.q, (err, next10) => {
        if(err) send_err(res, err);
        else{
          data.items = data.items.concat(next10.items);
          res.send(data);
        }
      }, 11); //start val for next10
    }
  });
});


// local search api route
router.get('/ls/:q', (req, res, next) => {
  loc.search(req.params.q, (err, data) => {
  	if(err) send_err(res, err);
  	else res.send(data);
  });
});




function send_err(res, err) {
  console.log('[error] An error occurred performing search: ', err);
  res.send('Error');
}



module.exports = router;
