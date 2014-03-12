angular.module('starter.tabs.about', [])

.config(function($stateProvider) {
  $stateProvider.state('tabs.about', {
    url: '/about',
    views: {
      'about-tab': {
        templateUrl: 'tabs/about/about.tpl.html'
      }
    }
  });
});
