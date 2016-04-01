'use strict';

var search = angular.module('search', [
        'ui.router'
      , 'ngSanitize'
]);

search
  // controllers
  .controller('mainCtrl', require('./main-ctrl'))
  .controller('optionCtrl', require('./option-ctrl'))

  // services
  .service('rankedSvc', require('./services/ranked-svc'))
  .service('mainSvc', require('./services/main-svc'))

  // directives
  .directive('dynTootip', require('./directives/dyn-tooltip'))
  .directive('dynCollapse', require('./directives/dyn-collapse'))
  .directive('loadWheel', require('./directives/load-wheel'))
  .directive('enterTrigger', require('./directives/enter-trigger'));


search.config([
        '$stateProvider'
      , '$urlRouterProvider'
      , ($stateProvider, $urlRouterProvider) => {

  require('./states.js')($stateProvider, $urlRouterProvider);

}]);
