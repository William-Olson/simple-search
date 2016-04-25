'use strict';

var crafter = require('../util/doc-crafter');


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

  };


  // Calc Jaccard Similarity.
  let rankJaccard = (hits) => {
    //TODO: implement this
    hits.forEach((h, i, a) => { h.weight = ((i + 0.0) / a.length); });
  };


  // Rerank the current web search results.
  service.reRank = (term, hits, cb, opts) => {
    //TODO: implement this
    // console.log('running reRank(' + term +
    //   ', arr[' + getRels(hits).length + '], cb, ', opts);
    // console.log(');');

    //create the combined doc

    //set vec property for each hit + term

    //compare similarities
    switch(opts.type) {
      case opts.JACC:
        //compare jaccard similarity
        rankJaccard(hits);
        break;
      case opts.COS:
        //compare cosine similarity
        rankCosine(hits);
        break;
      default:
        cb(new Error('Bad opt (algor) type!'));
    }

    //sort by rank
    hits.sort( (a, b) => (a.weight > b.weight) );

    console.log(hits);
    cb(null, hits);
  };



  return service;

};
