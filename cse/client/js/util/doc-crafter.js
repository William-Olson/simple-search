'use strict';

const stem = require('./porters-algorithm');
const stopWords = require('./stop-words');

let service = {};

// Initialize the doc intermediate representation (bag of words)
let init = (hitsArr) => {
  hitsArr.forEach((hit) => {
  	hit.doc_ir = hit.title + ' ' + hit.snippet;
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
  	hit.doc_ir.forEach((word) => {
      word = word.toLowerCase();
    });
  });
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



// helper functions

function vecLen(arrOfNums) {
  let sum = 0;
  arrOfNums.forEach((num) => { sum += (num * num); });
  return Math.sqrt(sum);
}

function dot(arr1, arr2) {
  let res = 0;
  let len = ((arr1.length > arr2.length) ?
              arr1.length : arr2.length);
  for(let i = 0; i < len; i++)
    res += arr1[i] * arr2[i];
  return res;
}

module.exports = service;