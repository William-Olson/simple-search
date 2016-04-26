'use strict';

// Bool for logging phases to console.
const SHOW_STEPS = false;

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
  //replace all punctuation & _ with spaces
  docStr = docStr.replace(/[^\w\s]|_/g, " ");
  //then split into array by whitespace
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
  let res = 0.0;
  let len = ((arr1.length < arr2.length) ?
              arr1.length : arr2.length);
  for(let i = 0; i < len; i++){
    res += arr1[i] * arr2[i];
  }
  return res;
}

// Returns an Array containing the
// union of terms between arr1 and
// arr2.
function getUnion(arr1, arr2) {
  //copy array 1
  let union = arr1.slice();
  //step through and add extras
  for(let i = 0; i < arr2.length; i++)
    if(union.indexOf(arr2[i]) === -1)
      union.push(arr2[i]);
  return union;
}

// Returns an Array containing the
// intersection elements between arr1 and
// arr2.
function getIntersection(arr1, arr2) {
  let intersection = [];
  for(let i = 0; i < arr1.length; i++)
    if(arr2.indexOf(arr1[i]) !== -1)
      intersection.push(arr1[i]);
  return intersection;
}

// Logs data to console with phase/step message.
function showStep(data, step, phase) {
  phase = (phase === 'H' ? ('HITS_PHASE' + step) :
                           ('QDOC_PHASE' + step) );
  switch(step) {
    case 0:  console.log(phase + '(str): ', data);      break;
    case 1:  console.log(phase + '(vec): ', data);      break;
    case 2:  console.log(phase + '(lower): ', data);    break;
    case 3:  console.log(phase + '(stopW): ', data);    break;
    case 4:  console.log(phase + '(norm): ', data);     break;
    default: console.log(data);
  }
}

// SERVICE METHODS --------------------------


// Crafts doc properties on hitsArr.
// The doc property is an Array of
// tf values (Numbers) OR an Array of
// term (Strings) without duplicates if
// the jaccard argument evaluates/coerces
// to true.
service.craft = (hitsArr, jaccard) => {
  init(hitsArr);
  if(SHOW_STEPS) showStep(hitsArr[0].doc_ir, 1, 'H');
  toLower(hitsArr);
  if(SHOW_STEPS) showStep(hitsArr[0].doc_ir, 2, 'H');
  rmStopWords(hitsArr);
  if(SHOW_STEPS) showStep(hitsArr[0].doc_ir, 3, 'H');
  normalize(hitsArr);
  if(SHOW_STEPS) showStep(hitsArr[0].doc_ir, 4, 'H');

  //handle which doc representation to use
  if(jaccard) getSets(hitsArr);
  else getTfVec(hitsArr);
};


// Builds the combined relevant query doc
// which is an Object with an array property
// called doc holding tf (cosine) or term 
// (jaccard) values.
service.build = (relHits, jaccard) => {

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
  if(SHOW_STEPS) showStep(resultDoc.doc_ir, 0);

  //convert doc_ir to array of terms
  resultDoc.doc_ir = getTermVec(resultDoc.doc_ir);
  if(SHOW_STEPS) showStep(resultDoc.doc_ir, 1);
  
  //handle term preprocessing
  let arr = [resultDoc];
  toLower(arr);
  if(SHOW_STEPS) showStep(resultDoc.doc_ir, 2);
  rmStopWords(arr);
  if(SHOW_STEPS) showStep(resultDoc.doc_ir, 3);
  normalize(arr);
  if(SHOW_STEPS) showStep(resultDoc.doc_ir, 4);
  //add the doc property (Array)
  //to the resultDoc object
  if(jaccard) getSets(arr);
  else getTfVec(arr);

  return resultDoc;
};


service.cmpCosine = (craftedHits, craftedQDoc) => {
  craftedHits.forEach((hit) => {
    hit.weight = (dot(hit.doc, craftedQDoc.doc) /
      (vecLen(hit.doc) * vecLen(craftedQDoc.doc)));
  });
};


service.cmpJaccard = (craftedHits, craftedQDoc) => {
  craftedHits.forEach((hit) => {
    let union = getUnion(hit.doc, craftedQDoc.doc);
    let intersect = getIntersection(hit.doc, craftedQDoc.doc);
    if(union.length === 0 && intersect.length === 0){
      hit.weight = 1.0;
    }else if (union.length === 0) {
      hit.weight = 0.0;
    }else {
      hit.weight = (intersect.length / union.length);
    }
  });
};

module.exports = service;
