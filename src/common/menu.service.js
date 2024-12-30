(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    return $http.get(ApiPath + '/menu_items/' + category + '.json').then(function (response) {
      return response.data;
    });
  };

  service.getMenuItem = function(shortName) {
    return $http.get(ApiPath + `/menu_items/${shortName[0]}/menu_items/${parseInt(shortName.substring(1,))}.json`)
      .then(function(response) {
        console.log(response.data.short_name);
        if(parseInt(shortName.substring(1,)) === parseInt(response.data.short_name.substring(1,)-1))
          return response.data;
        else
          throw("Error");
      })
      .catch(function(error){
        return null;
      });
  };

}



})();
