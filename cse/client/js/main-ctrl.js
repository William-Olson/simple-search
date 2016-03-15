'use strict';

// @ngInject
module.exports = ($scope, mainSvc) => {

  mainSvc.search('yo');

  //populate some data for searching
  const bank =  [
      { content: 'Example AAAA 1 foo bar',      link: 'http://www.google.com' }
    , { content: 'Example BBBB 2 test',         link: 'http://www.google.com' }
    , { content: 'Example CCCC 3 foo'            /* no link for this one */   }
    , { content: 'Example DDDD 4 test',         link: 'http://www.google.com' }
    , { content: 'Example EEEE 5 foo bar baz',  link: 'http://www.google.com' }
  ];


  //reset trigger for data searches
  var reset = () => { $scope.hits = []; };

  //the search method
  $scope.search = (term) => {
    reset();
    if(term !== ''){
      term = angular.lowercase(term); //insensitive searches
      $scope.hits = (angular.copy(bank)).filter((a) => {
        return angular.lowercase(a.content).indexOf(term) !== -1;
      });
      if($scope.hits.length === 0) $scope.hits = [{ content: 'No Results Found =(' } ];
    }
  };

};
