angular.module('public')
  .component('myInfoComponent', {
    templateUrl: '/src/public/user/myinfo.html',
    controller:  ['UserService', function(UserService) {
      var $ctrl = this;
      $ctrl.userInfo = UserService.getUserInfo();
    }]
  });