'use strict';

const stem = require('./porters-algorithm');
const stopWords = require('./stop-words');

let service = {};

// Initialize the doc intermediate representation
let init = (hitsArr) => {
  hitsArr.forEach((hit) => {
  	hit.doc_ir = hit.snippet;
  });
};


// Convert docStr to a vector (Array of type Number).
let getVec = (docStr) => {
  let result = [];
  //TODO: implement this
  return result;
};

//PHASE 1
let toLower = (hitsArr) => {
  hitsArr.forEach((hit) => {
  	hit.doc_ir = hit.doc_ir.toLowerCase();
  })
};

//PHASE 2
let rmStopWords = (hitsArr) => {

};


//PHASE 3
let normalize = (hitsArr) => {

};



// Crafts doc properties on result Objects
service.craft = (hitsArr) => {
  init(hitsArr);
  toLower(hitsArr);
  rmStopWords(hitsArr);
  normalize(hitsArr);
}

module.exports = service;