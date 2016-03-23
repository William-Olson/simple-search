'use strict';

// @ngInject
module.exports = function ($http) {
  var service = {};

  /*
	search:
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
  service.search = (term) => {
  	return $http.get('ws/' + term);
  };

  return service;

};
