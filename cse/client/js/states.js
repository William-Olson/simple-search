'use strict';
module.exports = function (){

//@ngInject
return function($stateProvider, $urlRouterProvider, mainSvc){

  $urlRouterProvider.otherwise('/404');
  $urlRouterProvider.when('', '/');

  $stateProvider
    .state('main', {
      url: '',
      templateUrl: 'views/partials/main.html'
    })
    .state('options', {
      url: '/config',
      controller: 'optionCtrl',
      parent: 'main',
      templateUrl: 'views/partials/options.html'
    })
    .state('search', {
      url: '/',
      controller: 'mainCtrl',
      parent: 'main',
      templateUrl: 'views/partials/search.html'
    })
    .state('results', {
      url: 'search/:term',
      controller: 'resultsCtrl',
      parent: 'search',
      templateUrl: 'views/partials/results.html'
    })
    .state('404', {
      url: '/404',
      templateUrl: 'views/partials/404.html'
    });
  };


}();