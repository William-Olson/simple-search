'use strict';

// @ngInject
module.exports = ($scope, mainSvc) => {

  // selects search box with cursor
  $scope.focusSrch = () => { $('#srchbox').focus(); };
  $scope.opts = mainSvc.getConfig().current;

  //focus on search box on page load
  setTimeout($scope.focusSrch, 100);

};
