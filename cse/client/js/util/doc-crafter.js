'use strict';

const stem = require('./porters-algorithm');
const stopWords = require('./stop-words');

let service = {};



// CRAFTER FUNCTIONS --------------------------

// Sets doc_ir property on objects in hitsArr
// to an array of terms (words).
let init = (hitsArr) => {
  hitsArr.forEach((hit) => {
    // combine to string
  	hit.doc_ir = hit.title.trim() + ' ' + hit.snippet.trim();

    //split string into an array of terms
    hit.doc_ir = getTermVec(hit.doc_ir);
  });
};

// Converts all the strings in each
// doc_ir array into lowercase strings.
let toLower = (hitsArr) => {
  hitsArr.forEach((hit) => {
  	hit.doc_ir.forEach((word, i, vec) => {
      vec[i] = word.toLowerCase();
    });
  });
};

// Removes all the English stop terms from each doc_ir.
let rmStopWords = (hitsArr) => {
  hitsArr.forEach((hit) => {
    hit.doc_ir = hit.doc_ir.filter((term) => {
      return (stopWords.english.indexOf(term) === -1);
    });
  });
};


// Returns an array containing arrOfTerms
// without duplicates.
let noDuplicates = (arrOfTerms) => {
  let noDupes = [];
  for(let i = 0; i < arrOfTerms.length; i++)
    if(noDupes.indexOf(arrOfTerms[i]) === -1)
      noDupes.push(arrOfTerms[i]);
  return noDupes;
};


// Stems all the terms in each doc_ir array.
let normalize = (hitsArr) => {
  hitsArr.forEach((hit) => {
    hit.doc_ir.forEach((term, i, vec) => {
      vec[i] = stem(term);
    });
  });
};

// Convert term vector (Array of terms) to
// array of tf values (Array of Numbers).
// and add it as a doc property for cosine
// similarity comparing.
let getTfVec = (hitsArr) => {
  hitsArr.forEach((hit) => {
    let tfMap = buildFreqMap(hit.doc_ir);
    hit.doc = [];
    hit.doc_ir.forEach((term) => {
      hit.doc.push(tfMap[term]);
    });
  });
};

// Adds the doc property to each hit in hitsArr
// containing the set of terms in doc_ir without
// and duplicate terms. (used for Jaccard comparing).
let getSets = (hitsArr) => {
  hitsArr.forEach((hit, i, hits) => {
    hits[i].doc = noDuplicates(hit.doc_ir);
  });
};

// HELPER FUNCTIONS --------------------------

// Convert docStr to a vector (Array of terms).
// splits on regex (matching strings)
function getTermVec(docStr) {
  return docStr.split(/[ ]+/g);
}

//Calculates the tf value for term in arr
function getFreq(term, arr) {
  let count = 0;
  arr.forEach((arrTerm) => {
    if(term === arrTerm) count++;
  });
  return count;
}

// Creates & returns an object that looks
// like the following { term1: tf1, term2: tf2, ..etc. }
function buildFreqMap(arrOfTerms) {
  let tfMap = {};

  for(let i = 0; i < arrOfTerms.length; i++){
    //skip if tf already set
    if(tfMap[ arrOfTerms[i] ] > 0) continue;
    //set tf value for term property in map
    tfMap[arrOfTerms[i]] = getFreq(arrOfTerms[i], arrOfTerms);
  }
  return tfMap;
}

// Returns vector length.
function vecLen(arrOfNums) {
  let sum = 0;
  arrOfNums.forEach((num) => { sum += (num * num); });
  return Math.sqrt(sum);
}

// Returns dot product from 2 vectors.
function dot(arr1, arr2) {
  let res = 0;
  let len = ((arr1.length > arr2.length) ?
              arr1.length : arr2.length);
  for(let i = 0; i < len; i++)
    res += arr1[i] * arr2[i];
  return res;
}




// SERVICE METHODS --------------------------


// Crafts doc properties on result Objects
service.craft = (hitsArr, jaccard) => {
  init(hitsArr);
  toLower(hitsArr);
  rmStopWords(hitsArr);
  normalize(hitsArr);

  //handle which doc representation to use
  if(jaccard) getSets(hitsArr);
  else getTfVec(hitsArr);
};


// Builds the combined relevant query doc
service.build = (relHits, jaccard) => {
  console.log('relHits: ', relHits);

  //the new query document
  let resultDoc = {
    snippet: '',
    title: '',
    doc_ir: ''
  };

  //combine relevant hit title/desc vals
  relHits.forEach((hit) => {
    resultDoc.snippet += hit.snippet + ' ';
    resultDoc.title += hit.title + ' ';
    resultDoc.doc_ir += hit.title + ' ' + hit.snippet + ' ';
  });

  //remove extra space at ends
  resultDoc.doc_ir = resultDoc.doc_ir.trim();

  console.log('PHASE1(str): ', resultDoc.doc_ir);

  //convert doc_ir to array of terms
  resultDoc.doc_ir = getTermVec(resultDoc.doc_ir);
  console.log('PHASE2(vec): ', resultDoc.doc_ir);
  
  //handle term preprocessing
  let arr = [resultDoc];
  toLower(arr);
  console.log('PHASE3(lower): ', resultDoc.doc_ir);
  rmStopWords(arr);
  console.log('PHASE4(stpW): ', resultDoc.doc_ir);
  normalize(arr);
  console.log('PHASE5(norm): ', resultDoc.doc_ir);
  //no duplicate terms for jaccard
  if(jaccard) {
    getSets(arr);
  } else {
    //add the doc property (array of tf values)
    //to the resultDoc object
    getTfVec(arr);
  }


  console.log('--in-crafter.build--: resultDoc: ', resultDoc);
  return resultDoc;
};




module.exports = service;
