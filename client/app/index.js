/**
 * Entry file for all app javascript
 */

angular.module('starter', [
  // app-wide dependencies
  'ionic',
  'templates.app',
  'templates.common',
  // page dependencies
  'starter.tabs'
])

.config(function($urlRouterProvider) {
  $urlRouterProvider.otherwise('/tabs/pets');
});
