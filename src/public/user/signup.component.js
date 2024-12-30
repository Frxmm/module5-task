angular.module('public')
  .component('signupComponent', {
    templateUrl: 'src/public/user/signup.html',
    controller:  ['MenuService', 'UserService', function(MenuService, UserService) {
        var $ctrl = this;
        $ctrl.user = {};
        $ctrl.savedMessage = "";
  
        $ctrl.submitForm = function() {
          MenuService.getMenuItem($ctrl.user.favorite).then(function(menuItem) {
            if (menuItem) {
              UserService.saveUserInfo({
                ...$ctrl.user,
                favoriteItem: menuItem
              });       
              $ctrl.savedMessage = "Your information has been saved.";
            } else {
              $ctrl.savedMessage = "Invalid menu item short name.";
            }
          });
        };
      }]
    });