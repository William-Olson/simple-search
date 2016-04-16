'use strict';



// @ngInject
module.exports = function ($http, $rootScope, mainSvc, rankedSvc, elasticSrch) {
  var service = {};
  const OPTS = mainSvc.getEnums();


  console.log(elasticSrch);

  // Available METHODS:
  // ------------------------------------------------------------


  /*
	search_web:
		uses googles api on backend for
		web query searches

	returned payloads look like this (filtered for brevity):
		response.data.items = [ {
		  displayLink: "nodeberlin.com"
		  formattedUrl: "nodeberlin.com/"
		  htmlFormattedUrl: "<b>node</b>berlin.com/"
		  htmlSnippet: "<b>NODE</b> is currently at ..."
		  htmlTitle: "<b>NODE</b> Berlin Oslo — Graphic Design Studio"
		  link: "http://nodeberlin.com/"
		  snippet: "NODE is currently at MIT ..."
		  title: "NODE Berlin Oslo — Graphic Design Studio"
		} ... ]
  */
  let search_web = (term) => {
  	return $http.get('ws/' + term);
  };

  // Search local documents.
  let search_local = (term) => {
    //TODO: implement this
  };

  // Search delegator function
  service.search = (term) => {
    if($rootScope.config.current.search == OPTS.LOC)
      return search_local(term);
    else
      return search_web(term);
  };


  // proxy the rankedSvc's reRank method
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
