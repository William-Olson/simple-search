'use strict';

// Search Options
const OPTS = {
  WEB: 'Web',
  LOC: 'Local',
  JACC: 'Jaccard',
  COS:  'Cosine Similarity'
};

// @ngInject
module.exports = function ($http, $rootScope, $localStorage) {
  var service = {};

  // $rootScope STRUCTS:
  // ------------------------------------------------------------

  // for current & possible search configurations
  $rootScope.config = $localStorage.$default({
      current: {
        search: OPTS.WEB,
        ranked: false,
        algor: OPTS.COS
      },
      available: {
        search: [OPTS.WEB, OPTS.LOC],
        algor: [OPTS.JACC, OPTS.COS]
      }
  });

  // for the global h3 tag on pages
  $rootScope.pageTitle = {
    val: 'App'
  };


  // Available METHODS:
  // ------------------------------------------------------------

  service.setPageTitle = (value) => {
    if(value) $rootScope.pageTitle.val = value;
  };

  // Retrieve the current config settings.
  service.getConfig = () => {
    return angular.copy($rootScope.config);
  };

  // Adjust the config settings.
  service.setConfig = (newConfig) => {
    if(newConfig.current)
      $rootScope.config.current = newConfig.current;
  };

  // Retrieve the settings enum values.
  service.getEnums = () => {
    return OPTS;
  };

  // ------------------------------------------------------------


  return service;

};
