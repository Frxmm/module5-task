describe('SignupComponent Favorite Menu Item Validation', function() {
    var $componentController, $httpBackend, API_URL, scope, ctrl;
  
    beforeEach(module('public'));
  
    beforeEach(inject(function(_$componentController_, _$httpBackend_, _API_URL_, $rootScope) {
      $componentController = _$componentController_;
      $httpBackend = _$httpBackend_;
      API_URL = _API_URL_;
      scope = $rootScope.$new();
  
      // Initialize the component controller
      ctrl = $componentController('signupComponent', { $scope: scope });
    }));
  
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
  
    it('should validate that the favorite menu item exists and display success message', function() {
      // Arrange: Mock menu item API response
      var favoriteMenuItem = {
        short_name: 'A1',
        name: 'Won Ton Soup with Chicken',
        description: 'Delicious chicken-stuffed won tons in chicken broth.',
        price_small: 2.55,
        price_large: 5.0
      };
  
      ctrl.user = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        favoriteItem: 'A1' // Short name of the menu item
      };
  
      // Expectation for the HTTP request
      $httpBackend.expectGET(API_URL + '/menu_items/A1.json').respond(200, favoriteMenuItem);
  
      // Act: Simulate form submission
      ctrl.submitForm();
      $httpBackend.flush();
  
      // Assert: Check that the success message is displayed
      expect(ctrl.message).toBe('Your information has been saved.');
      expect(ctrl.favoriteItemDetails).toEqual(favoriteMenuItem);
    });
  
    it('should validate that the favorite menu item does not exist and display error message', function() {
      // Arrange: Mock API 404 response
      ctrl.user = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        favoriteItem: 'INVALID' // Invalid short name
      };
  
      $httpBackend.expectGET(API_URL + '/menu_items/INVALID.json').respond(404, {});
  
      // Act: Simulate form submission
      ctrl.submitForm();
      $httpBackend.flush();
  
      // Assert: Check that the error message is displayed
      expect(ctrl.message).toBe('No such menu number exists.');
      expect(ctrl.favoriteItemDetails).toBeUndefined();
    });
  });
  