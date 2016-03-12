'use strict';

var search = angular.module('search', [
        'ui.router'
]);

search
  .controller('mainCtrl', require('./main-ctrl'));


search.config([
        '$stateProvider'
      , '$urlRouterProvider'
      , ($stateProvider, $urlRouterProvider) => {

  require('./states.js')($stateProvider, $urlRouterProvider);

}]);
