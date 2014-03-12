angular.module('starter.tabs', [
  'starter.tabs.about',
  'starter.tabs.adopt',
  'starter.tabs.pet-detail',
  'starter.tabs.pet-index',
])

.config(function($stateProvider) {
  $stateProvider.state('tabs', {
    url: "/tabs",
    abstract: true,
    templateUrl: 'tabs/tabs.tpl.html'
  });
});
