'use strict';

// @ngInject
module.exports = ($scope) => {

  // selects search box with cursor
  $scope.focusSrch = () => { $('#srchbox').focus(); };

  //focus on search box on page load
  setTimeout($scope.focusSrch, 100);

};
