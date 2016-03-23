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
  googleSearch.build({
    q: term,
    num: 10 
  }, cb); // cb(err, rsp);
};


module.exports = mod;
