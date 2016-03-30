
'use strict';

// @ngInject
module.exports = () => {

  return {
    restrict: 'AC',
    templateUrl: 'views/partials/load-wheel.html',
    scope: {
    	showTrigger: '='
    }
  };

};
