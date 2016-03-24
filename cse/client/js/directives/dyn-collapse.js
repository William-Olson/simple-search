//[enter] keypress trigger for search box

'use strict';

// @ngInject
module.exports = () => {

  return {
    restrict: 'A',
    link: () => {
      $('.collapsible').collapsible({
	    accordion : true
	  });
    }
  };

};
