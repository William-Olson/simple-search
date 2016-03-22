'use strict';

var search = angular.module('search', [
        'ui.router'
]);

search
  .controller('mainCtrl', require('./main-ctrl'))
  .service('mainSvc', require('./main-svc'));


search.config([
        '$stateProvider'
      , '$urlRouterProvider'
      , ($stateProvider, $urlRouterProvider) => {

  require('./states.js')($stateProvider, $urlRouterProvider);
    // Set up all the materialize js actions
    $(document).ready(function(){
      $('.modal-trigger').leanModal();
    });
    $('.collapsible').collapsible({
      accordion : true
    });
}]);
