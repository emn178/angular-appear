/*
 * angular-appear v0.1.1
 * https://github.com/emn178/angular-appear
 *
 * Copyright 2014, emn178@gmail.com
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */
;(function(angular) {
  var ngAppear = angular.module('ngAppear', []);
  ['appear', 'disappear', 'appearing'].forEach(function(eventName) {
    var directiveName = 'ng' + eventName.substring(0,1).toUpperCase() + eventName.substring(1);
    ngAppear.directive(directiveName, ['$parse', function($parse) {
      return {
        restrict: 'A',
        compile: function($element, attr) {
          var fn = $parse(attr[directiveName]);
          return function ngEventHandler(scope, element) {
            element.on(eventName, function(event) {
              scope.$apply(function() {
                fn(scope, {$event: event});
              });
            });
          };
        }
      };
    }]);
  });
})(angular);
