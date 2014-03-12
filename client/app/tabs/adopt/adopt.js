angular.module('starter.tabs.adopt', [])

.config(function($stateProvider) {
  $stateProvider.state('tabs.adopt', {
    url: '/adopt',
    views: {
      'adopt-tab': {
        templateUrl: 'tabs/adopt/adopt.tpl.html'
      }
    }
  });
});
