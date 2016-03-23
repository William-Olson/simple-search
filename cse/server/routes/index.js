var express = require('express');
var router = express.Router();
var searcher = require('../searcher');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html');
});



router.get('/ws/:q', (req, res, next) => {
  searcher.search(req.params.q, (err, data) => {
  	if(err){
  	  console.error('[error] An error occurred performing a search', err);
  	  res.send('Error');
  	}
  	else res.send(data);
  });
});



module.exports = router;
