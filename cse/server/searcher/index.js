#!/usr/bin/env node
'use strict';



console.log(process.env);

var mod = {};

var GoogleSearch = require('./google-search');

const KEY = 'AIzaSyDxNlkQr5OUzksF-sYiDSUV5yETqDQYdRA';
const CX = '000222027959024245870:sr3el8gqxi0';

var googleSearch = new GoogleSearch({
  key: KEY,
  cx: CX
});
 


mod.search = (term, cb) => {
  googleSearch.build({
    q: term,
    num: 10 
  }, cb); // cb(err, rsp);
};


module.exports = mod;
