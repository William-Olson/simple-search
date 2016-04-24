'use strict';

const stem = require('./porters-algorithm');
const stopWords = require('./stop-words');

let service = {};

// PHASE 0
// Initialize the doc intermediate representation (array of terms)
let init = (hitsArr) => {
  hitsArr.forEach((hit) => {
    // combine title with snippet into a string
  	hit.doc_ir = hit.title.trim() + ' ' + hit.snippet.trim();
    //split string into an array of terms
    hit.doc_ir = getTermVec(hit.doc_ir);
  });
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
  hitsArr.forEach((hit) => {
    for(let i=0; i < hit.doc_ir.length; i++) {
      if(stopWords.indexOf(term) !== -1) {
        //remove all these terms from vector
        hit.doc_ir.splice(term);
        //try new element at this index on next loop
        i = i-1;
      }
    }
  });
};


//PHASE 3
let normalize = (hitsArr) => {
  hitsArr.forEach((hit) => {
    hit.doc_ir.forEach((term, i, vec) => {
      vec[i] = stem(term);
    });
  });
};


//PHASE 4
// Convert term vector (Array of terms) to
// array of tf values (Array of Numbers).
let getTfVec = (hitsArr) => {
  hitsArr.forEach((hit) => {
    let map = buildFreqMap(hit.doc_ir);
    hit.doc = [];
    hit.doc_ir.forEach((term, i, arr) => {
      hit.doc.push(map[term]);
    });
  });
};


// Crafts doc properties on result Objects
service.craft = (hitsArr) => {
  init(hitsArr);
  toLower(hitsArr);
  rmStopWords(hitsArr);
  normalize(hitsArr);
}


// Builds the combined relevant query doc
service.build = (relHits) => {
  let resultDoc = {
    snippet: '',
    title: ''
  };

  //combine relevant hit title/desc vals
  relHits.forEach((hit) => {
    resultDoc.snippet += hit.snippet + ' ';
    resultDoc.title += hit.title + ' '
  });

  //remove extra space at end
  resultDoc.snippet.trim();
  resultDoc.title.trim();

  //use methods to craft vec
  let arr = [resultDoc];
  init(arr);
  toLower(arr);
  rmStopWords(arr);
  normalize(arr);
  
  console.log('resultDoc: ', arr[0]);
  return arr[0];
}



// helper functions

// Convert docStr to a vector (Array of terms).
// splits on regex (matching strings)
let getTermVec = (docStr) => {
  return docStr.split(/\s+/);
};


// function getFeq(term, arr) {
//   let count = 0;
//   arr.forEach((arrTerm) => {
//     if(term === arrTerm) count++;
//   });
//   return count;
// }

function buildFeqMap(arrOfTerms) {
  let map = {};

  for(let i = 0; i < arrOfTerms.length; i++){
    if(map[ arrOfTerms[i] ] > 0) continue;
    map[arrOfTerms[i]] = 0;
    arrOfTerms.forEach((term) => {
      if(arrOfTerms[i] === term) map[term] += 1;
    });
  }
  return map;
}


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