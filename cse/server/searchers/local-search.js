'use strict';

var elastic = require('elasticsearch');


module.exports = {
  search: (term, cb) => {
  	//create client
    var client = client || new elastic.Client({
      host: 'ss_elastic:9200'
    });
    //search this localdata
    client.search({
        index: 'localdata'
      , type: 'repos'
      , q: term
      , size: 200 // max results to return
    }).then((resp) => { cb(null, resp); }
    	  , (err)  => { cb(err); });
  }
};