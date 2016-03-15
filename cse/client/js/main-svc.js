'use strict';


module.exports = () => {
  var service = {};
  

  service.search = (term) => {
  	console.log('you called mainSvc.search(' + term + ')');
  };

  return service;

};
