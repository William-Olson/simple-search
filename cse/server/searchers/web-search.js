'use strict';

// relies heavily on this library
var GoogleSearch = require('wko-google-search');

// api keys
const KEY = process.env.GOOG_API_KEY;
const CX = process.env.GOOG_API_CX;

// create a searcher
var googleSearch = new GoogleSearch({
  key: KEY,
  cx: CX
});


module.exports = {

  search: (term, cb, start) => {
    let s = start || 1;
    let req = { q: term, num: 10, start: s };
    // send query
    googleSearch.build(req, (err, res) => {
    	if(err) cb(err);
      else cb(null, res);
    });
  }

};
