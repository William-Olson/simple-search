'use strict';

// @ngInject
module.exports = ($scope, mainSvc) => {


  $scope.config = {
      state: 'options'
    , options: [ 'search', '404']
  };


  //reset trigger for data searches
  var reset = (clr) => {
    $scope.hits = [];
    if (clr) {
      $scope.qterm = '';
      $('#srchbox').focus();
    }
  };
  $scope.reset = reset;
  
  //the search method
  $scope.search = (term) => {
    reset();
    if(term !== ''){
      term = angular.lowercase(term); //insensitive searches
      mainSvc.search(term).then((resp) => {
        // console.log(resp);
        if(resp.data !== 'Error'){
          $scope.hits = angular.copy(resp.data.items);
        }
      });
    }
  };

};
