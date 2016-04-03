'use strict';

// Search Options
const OPTS = {
  WEB: 'Web',
  LOC: 'Local',
  JACC: 'Jaccard',
  COS:  'Cosine Similarity'
};

// bring in porters stemming algoritm
const stemmer = require('../util/porters-algorithm');

// @ngInject
module.exports = function ($http, $rootScope, rankedSvc) {
  var service = {};

  // Possible & current search configurations
  $rootScope.config = $rootScope.config || {
      current: {
        search: OPTS.WEB,
        ranked: false,
        algor: OPTS.COS
      },
      available: {
        search: [OPTS.WEB, OPTS.LOC],
        algor: [OPTS.JACC, OPTS.COS]
      }
  };

  // for headers on pages
  $rootScope.pageTitle = {
    val: 'App'
  };

  service.setPageTitle = (value) => {
    if(value) $rootScope.pageTitle.val = value;
  };

  // Retrieve the current config options.
  service.getConfig = () => {
    return angular.copy($rootScope.config);
  };

  // Adjust the config settings.
  service.setConfig = (newConfig) => {
    if(newConfig.current)
      $rootScope.config.current = newConfig.current;
  };

  // Adjust the config settings.
  service.getEnums = () => {
    return OPTS;
  };


  /*
	search_web:
		uses googles api on backend for
		web query searches

	returned payloads look like this:
		response.data.items = [ {
		  cacheId: "7I2YERf65UoJ"
		  displayLink: "nodeberlin.com"
		  formattedUrl: "nodeberlin.com/"
		  htmlFormattedUrl: "<b>node</b>berlin.com/"
		  htmlSnippet: "<b>NODE</b> is currently at ..."
		  htmlTitle: "<b>NODE</b> Berlin Oslo — Graphic Design Studio"
		  kind: "customsearch#result"
		  link: "http://nodeberlin.com/"
		  pagemap: Object
		  snippet: "NODE is currently at MIT ..."
		  title: "NODE Berlin Oslo — Graphic Design Studio"
		} ... ]
  */
  let search_web = (term) => {
    // let stemmed = stemmer(term);
    // console.log('stemmed: ' + term + '  -to-> ' + stemmed);
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

  return service;

};
