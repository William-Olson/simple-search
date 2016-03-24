//[enter] keypress trigger for search box

'use strict';

// @ngInject
module.exports = () => {

  return {
    restrict: 'EA',
    link: () => {
      $("#srchbox").keyup((event) => {
        if(event.keyCode == 13){
            $("#srchbtn").click();
        }
      });
    }
  };

};