'use strict';

var search = angular.module('search', [
        'ui.router'
      , 'ngSanitize'
]);

search
  .controller('mainCtrl', require('./main-ctrl'))
  .controller('optionCtrl', require('./option-ctrl'))
  .service('mainSvc', require('./main-svc'))
  .directive('dynTootip', require('./directives/dyn-tooltip'))
  .directive('dynCollapse', require('./directives/dyn-collapse'))
  .directive('enterTrigger', require('./directives/enter-trigger'));


search.config([
        '$stateProvider'
      , '$urlRouterProvider'
      , ($stateProvider, $urlRouterProvider) => {

  require('./states.js')($stateProvider, $urlRouterProvider);

}]);
