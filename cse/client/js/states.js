'use strict';
module.exports = function (){

//@ngInject
return function($stateProvider, $urlRouterProvider, mainSvc){

  $urlRouterProvider.otherwise('/404');
  $urlRouterProvider.when('', '/');

  $stateProvider
    .state('main', {
      url: '',
      templateUrl: 'views/main.html'
    })
    .state('options', {
      url: '/config',
      controller: 'optionCtrl',
      parent: 'main',
      templateUrl: 'views/options.html'
    })
    .state('search', {
      url: '/',
      controller: 'mainCtrl',
      parent: 'main',
      templateUrl: 'views/search.html'
    })
    .state('results', {
      url: 'search/:term',
      controller: 'resultsCtrl',
      parent: 'search',
      templateUrl: 'views/results.html'
    })
    .state('404', {
      url: '/404',
      templateUrl: 'views/404.html'
    });
  };


}();