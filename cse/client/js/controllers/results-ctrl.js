'use strict';

// @ngInject
module.exports = ($scope, mainSvc, searchSvc, $stateParams) => {

  // handle route params
  let term = $stateParams.term;
  $scope.$parent.qterm = $scope.$parent.qterm || term;

  // set options & loading wheel trigger
  const OPTS = mainSvc.getEnums();
  $scope.opts = mainSvc.getConfig().current;
  $scope.working = false;

  //reset trigger for data searches
  var reset = $scope.reset = () => {
    $scope.hits = [];
  };

  // PERFORM SEARCH:
  // --------------------------------------------------------
  reset();
  if(term && term !== ''){
    $scope.working = true;
    term = angular.lowercase(term); //insensitive searches
    searchSvc.search(term).then((resp) => {
      if(resp.data !== 'Error'){
        if($scope.opts.search === OPTS.LOC){
          if(resp.statusText === 'OK')
            resp.data.hits.hits.forEach((h) => {
              $scope.hits.push(h._source);
            });
          if($scope.hits.length === 0)
            $scope.hits.push({name: 'Uh oh..',
              description: 'No results. \n' +
              'Try searching your favorite programming language.'});
        } else {
          $scope.hits = angular.copy(resp.data.items);
          $scope.hits.forEach((h) => { h.rel = false; } );
        }
      } else {
        console.error('An Error Has occurred');
      }
      $scope.working = false;
    });
  }
  // --------------------------------------------------------

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
      searchSvc.reRank(term, hits, (err, data) => {
        if(err) console.error('Error: A reRank error has occurred!\n', err);
        else{
          $scope.hits = data;
          $scope.hits.forEach((h) => { h.rel = false; } );
        }
        $scope.working = false;
      });
    }
  };

  // get the number of relevant checks made
  $scope.relCount = () => {
    if($scope.hits)
      return $scope.hits.filter(h => h.rel).length;
    else return 0;
  };

  $scope.toLang = (str) => {
    let chipTag = angular.lowercase(str);
    if(chipTag){
      chipTag = chipTag.replace(/[ ]/g, '-');      // emacs lisp => emacs-lisp
      chipTag = chipTag.replace(/[+]/g, 'p');      // c++ => cpp
      chipTag = chipTag.replace(/[#]/g, '-sharp'); // f#  => f-sharp
    }
    return chipTag;
  };



};
