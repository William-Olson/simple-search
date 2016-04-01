'use strict';

// @ngInject
module.exports = ($scope, mainSvc, $rootScope) => {

  $scope.working = false;
  $scope.opts = mainSvc.getConfig().current;
  $scope.rel = [];


  //reset trigger for data searches
  var reset = $scope.reset = () => {
    $scope.hits = [];
  };

  //the search triggering method
  $scope.search = (term) => {
    reset();
    if(term && term !== ''){
      $scope.working = true;
      term = angular.lowercase(term); //insensitive searches
      mainSvc.search(term).then((resp) => {
        if(resp.data !== 'Error'){
          $scope.hits = angular.copy(resp.data.items);
          $scope.hits.forEach((h) => { h.rel = false; } );
        }
        $scope.working = false;
      });
    }
  };

  // the re-rank triggering method
  $scope.reRank = (term) => {
    let count = $scope.relCount();
    if(count > 0 && count <= 5){
      let arr = $scope.hits.filter(h => h.rel);
      console.log('rels: ', arr);
    }
  };

  // selects search box with cursor
  $scope.focusSrch = (st) => {
    $('#srchbox').focus();
  };

  // get the number of relevant checks made
  $scope.relCount = () => {
    if($scope.hits)
      return $scope.hits.filter(h => h.rel).length;
    else return 0;
  }

  //focus on search box on page load
  setTimeout( () => {
    $('#srchbox').focus();
  }, 100);

  // display global setting changes automatically
  $rootScope.$watch('config.current', (changed) => {
    if(changed) $scope.opts = mainSvc.getConfig().current;
  });
};
