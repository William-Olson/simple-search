'use strict';
module.exports = function (){

//@ngInject
return function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/404');
  $urlRouterProvider.when('', '/');

  $stateProvider
    .state('search', {
      url: '/',
      controller: 'mainCtrl'
    })
    .state('404', {
      url: '/404',
      template: '<h3>Error</h3><p>Something has gone wrong!</p>'
    });
  };


}();