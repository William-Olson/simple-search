'use strict';
module.exports = function (){

//@ngInject
return function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/404');
  $urlRouterProvider.when('', '/');

  $stateProvider
    .state('search', {
      url: '/',
      controller: 'mainCtrl',
      templateUrl: 'views/main.html'
    })
    .state('options', {
      url: 'config',
      controller: 'optionCtrl',
      parent: 'search',
      templateUrl: 'views/options.html'
    })
    .state('404', {
      url: '/404',
      templateUrl: 'views/404.html'
    });
  };


}();