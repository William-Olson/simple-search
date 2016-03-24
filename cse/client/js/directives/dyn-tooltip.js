//[enter] keypress trigger for search box

'use strict';

// @ngInject
module.exports = () => {

  return {
    restrict: 'AC',
    link: () => {
      $('.tooltipped').tooltip({delay: 50});
    }
  };

};
