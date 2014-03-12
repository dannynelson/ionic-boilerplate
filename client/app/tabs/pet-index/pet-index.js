angular.module('starter.tabs.pet-index', ['resources.pets'])

.config(function($stateProvider) {
  $stateProvider.state('tabs.pet-index', {
    url: '/pets',
    views: {
      'pets-tab': {
        templateUrl: 'tabs/pet-index/pet-index.tpl.html',
        controller: 'PetIndexCtrl'
      }
    },
    resolve: {
      pets: function(Pets) {
        return Pets.all();
      }
    }
  });
})

// A simple controller that fetches a list of data from a service
.controller('PetIndexCtrl', function($scope, pets) {
  $scope.pets = pets;
});
