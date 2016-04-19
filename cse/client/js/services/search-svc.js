'use strict';



// @ngInject
module.exports = function ($http, $rootScope, mainSvc, rankedSvc) {
  var service = {};
  const OPTS = mainSvc.getEnums();


  // Available METHODS:
  // ------------------------------------------------------------

  // search: delegator function for both local & web searches.
  // makes calls to the cse nodejs server (see routes.js
  // in the server directory to see how it handles these
  // requests on the backend).
  service.search = (term) => {
    if($rootScope.config.current.search == OPTS.LOC)
      return $http.get('ls/' + term);
    else
      return $http.get('ws/' + term);
  };


  // reRank: make rankedSvc's method available here
  service.reRank = (term, hits, cb) => {
    return rankedSvc.reRank(term, hits, cb, {
      JACC: OPTS.JACC,
      COS: OPTS.COS,
      type: $rootScope.config.current.algor
    });
  };

// ------------------------------------------------------------


  return service;

};
