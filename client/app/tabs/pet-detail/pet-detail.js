angular.module('starter.tabs.pet-detail', ['resources.pets'])

.config(function($stateProvider) {
  $stateProvider.state('tabs.pet-detail', {
    url: '/pet/:petId',
    views: {
      'pets-tab': {
        templateUrl: 'tabs/pet-detail/pet-detail.tpl.html',
        controller: 'PetDetailCtrl'
      }
    },
    resolve: {
      pet: function($stateParams, Pets) {
        return Pets.get($stateParams.petId);
      }
    }
  });
})


.controller('PetDetailCtrl', function($scope, pet) {
  $scope.pet = pet;
});
