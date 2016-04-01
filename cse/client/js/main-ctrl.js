'use strict';

// @ngInject
module.exports = ($scope, mainSvc, $rootScope, $state) => {

  console.log($state.current);

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

  // TODO: display dialogs for errors
  // ui-router options on same level as search
  // + stateful searches, ex: search/foo

  // the re-rank triggering method
  $scope.reRank = (term) => {
    let count = $scope.relCount();
    if(count > 0 && count <= 5){
      if(!term || term === ''){
        console.error('Error: Can\'t re-rank, term input is empty!');
        return;
      }
      let hits = angular.copy($scope.hits);
      reset();
      $scope.working = true;
      mainSvc.reRank(term, hits, (err, data) => {
        if(err) console.error('Error: A reRank error has occurred!\n', err);
        else{
          $scope.hits = data;
          $scope.hits.forEach((h) => { h.rel = false; } );
        }
        $scope.working = false;
      });
    }
  };

  // selects search box with cursor
  $scope.focusSrch = () => { $('#srchbox').focus(); };

  // get the number of relevant checks made
  $scope.relCount = () => {
    if($scope.hits)
      return $scope.hits.filter(h => h.rel).length;
    else return 0;
  };

  //focus on search box on page load
  setTimeout($scope.focusSrch, 100);

  // display global setting changes automatically
  $rootScope.$watch('config.current', (changed) => {
    if(changed) $scope.opts = mainSvc.getConfig().current;
  });
};
