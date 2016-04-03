#!/usr/bin/env node
'use strict';


var GoogleSearch = require('./google-search');

// api keys
const KEY = process.env.GOOG_API_KEY;
const CX = process.env.GOOG_API_CX;

// create a searcher
var googleSearch = new GoogleSearch({
  key: KEY,
  cx: CX
});
 

// module setup
var mod = {};
mod.search = (term, cb) => {
  let req = {
  	q: term,
  	num: 10
  };
  // send query
  googleSearch.build(req, (err1, res1) => {

  	if(err1) cb(err1);
      //now try to grab the next page
      if(res1.searchInformation && res1.searchInformation.totalResults > 10) {

      	//perform the nextPage query
        req.start = 11;
        googleSearch.build(req, (err2, res2) => {
          if(err2) cb(err2);

          //concat results and return them
          if(res2.items)
          	res1.items = res1.items.concat(res2.items);

          //return response 1 with or with-out res2 items
          cb(null, res1);
        });

      } else{
      	cb(null, res1);
      }

  });
};


module.exports = mod;
