'use strict';

// @ngInject
module.exports = function ($http, $rootScope) {
  var service = {};

  // Convert docStr to a vector (Array of type Number).
  let getVec = (docStr) => {
    let result = [];
    //TODO: implement this
    return result;
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
  service.rerank = (hits, term, opts) => {
    let results = [];
    //TODO: implement this
    return result;
  }



  return service;

};
