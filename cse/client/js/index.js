'use strict';

var search = angular.module('search', [
        'ui.router'
      , 'ngSanitize'
]);

search
  .controller('mainCtrl', require('./main-ctrl'))
  .service('mainSvc', require('./main-svc'));


search.config([
        '$stateProvider'
      , '$urlRouterProvider'
      , ($stateProvider, $urlRouterProvider) => {

  require('./states.js')($stateProvider, $urlRouterProvider);

  $(document).ready(() => {

    //modals setup
    $('.modal-trigger').leanModal();

    //accordion menus setup
    $('.collapsible').collapsible({
      accordion : true
    });

    //[enter] keypress trigger for search box
    $("#srchbox").keyup((event) => {
      if(event.keyCode == 13){
          $("#srchbtn").click();
      }
    });

  });

}]);
