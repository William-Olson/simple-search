'use strict';

const OPTS = {
  WEB: 'Web',
  LOC: 'Local',
  ON: 'On',
  OFF: 'Off',
  JACC: 'Jaccard',
  COS:  'Cosine Similarity'
};

// @ngInject
module.exports = function ($http, $rootScope) {
  var service = {};

  $rootScope.config = $rootScope.config || {
      current: {
        search: OPTS.WEB,
        ranked: OPTS.OFF,
      },
      available: {
        search: [OPTS.WEB, OPTS.LOC],
        ranked: [OPTS.ON, OPTS.OFF]
      }
  };

  // Retrieve the current config options.
  service.getConfig = () => {
    return angular.copy($rootScope.config);
  };

  // Adjust the config settings.
  service.setConfig = (newConfig) => {
    if(newConfig) $rootScope.config = newConfig;
  };

// ------------------------------------------
// stubbs for re-ranking

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
  service.rerank = (hits, term) => {
    let results = [];
    //TODO: implement this
    return result;
  }

// ------------------------------------------

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

  return service;

};
