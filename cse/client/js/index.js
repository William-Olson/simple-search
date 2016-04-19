'use strict';

var search = angular.module('search', [
        'ui.router'
      , 'ngSanitize'
]);

search
  // controllers
  .controller('mainCtrl', require('./controllers/main-ctrl'))
  .controller('resultsCtrl', require('./controllers/results-ctrl'))
  .controller('optionCtrl', require('./controllers/option-ctrl'))

  // services
  .service('rankedSvc', require('./services/ranked-svc'))
  .service('mainSvc', require('./services/main-svc'))
  .service('searchSvc', require('./services/search-svc'))

  // directives
  .directive('loadWheel', require('./directives/load-wheel'))
  .directive('enterTrigger', require('./directives/enter-trigger'));


search.config([
        '$stateProvider'
      , '$urlRouterProvider'
      , ($stateProvider, $urlRouterProvider) => {

  require('./states.js')($stateProvider, $urlRouterProvider);

}]);
