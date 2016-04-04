'use strict';

// @ngInject
module.exports = () => {
  var service = {};


  // Creates array containing only relevant hits.
  let getRels = (hits) => {
    return hits.filter(h => h.rel);
  };


  // Calc Cosine Similarity.
  let cmpCos = (docVec1, docVec2) => {
    let result = -1.0;
    //TODO: implement this
    return result;
  };


  // Calc Jaccard Similarity.
  let cmpJac = (docVec1, docVec2) => {
    let result = -1.0;
    //TODO: implement this
    return result;
  };


  // Rerank the current web search results.
  service.reRank = (term, hits, cb, opts) => {
    let results = [];
    //TODO: implement this
    console.log('running reRank(' + term +
      ', arr[' + getRels(hits).length + '], cb, ', opts);
    console.log(');');

    //create the combined doc

    //set vec property for each hit + term

    //compare similarities
    switch(opts.type) {
      case opts.JACC:
        //compare jaccard similarity
        break;
      case opts.COS:
        //compare cosine similarity
        break;
      default:
        cb(new Error('Bad opt (algor) type!'));
    }

    cb(null, results);
  };



  return service;

};
