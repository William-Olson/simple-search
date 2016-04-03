'use strict';

// @ngInject
module.exports = ($scope, mainSvc, $state) => {

  //get current settings
  const OPTS = mainSvc.getEnums();
  let config = mainSvc.getConfig();
  mainSvc.setPageTitle('Options');

  //display current settings
  $scope.opts = config.available;
  $scope.usrInput = config.current;

  //save options & go back to search
  $scope.saveOpts = () => {
    mainSvc.setConfig({
      current: angular.copy($scope.usrInput)
    });
    $state.go('search', {});
  };

  $scope.disableCheck = () => {
  	if($scope.usrInput.search === OPTS.LOC) {
      $scope.usrInput.ranked = false;
  	}
  };

};
