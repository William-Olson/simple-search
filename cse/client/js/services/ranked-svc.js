'use strict';

var crafter = require('../util/doc-crafter');
const LOG_HITS = false; //show objects in console

// @ngInject
module.exports = () => {
  var service = {};


  // Creates array containing only relevant hits.
  let getRels = (hits) => {
    return hits.filter(h => h.rel);
  };


  // Calc Cosine Similarity.
  let rankCosine = (hits) => {
    //create tf arrays
    crafter.craft(hits);

    //create query doc
    let qDoc = crafter.build(getRels(hits));
    
    //add weights
    crafter.cmpCosine(hits, qDoc);
  };


  // Calc Jaccard Similarity.
  let rankJaccard = (hits) => {
    //pass jaccard bool for set doc_ir
    crafter.craft(hits, true);

    //create query doc (as set)
    let qDoc = crafter.build(getRels(hits), true);
    
    //add weights
    crafter.cmpJaccard(hits, qDoc);
  };


  // Rerank the current web search results.
  service.reRank = (term, hits, cb, opts) => {

    //delegate to specific implementation & calc ranks
    switch(opts.type) {
      case opts.JACC:
        rankJaccard(hits);
        break;
      case opts.COS:
        rankCosine(hits);
        break;
      default:
        cb(new Error('[reRank Error] Bad opt (algor) type!'));
    }

    //sort by rank
    hits.sort( (a, b) => (a.weight < b.weight ? 1 :  (a.weight > b.weight ? -1 :  0) ) );


    if(LOG_HITS){
      console.log('LOGGING SORTED HITS:');
      console.log(hits);
    }
    //return reRank results
    cb(null, hits);
  };



  return service;

};
