angular.module('public')
.service('UserService', function() {
    var service = this;
    var userInfo = null;

    service.saveUserInfo = function(info) {
      userInfo = info;
    };

    service.getUserInfo = function() {
      return userInfo;
    }
});