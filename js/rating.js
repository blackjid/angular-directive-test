'use strict';

angular.module('test', [])
  .directive('rating', function () {
    return {
      template: '<ul class="rating"></ul>',
      replace: true,
      restrict: 'E',
      scope: {
        value: '@'
      },
      link: function postLink(scope, element, attrs) {
        // Set default max stars
        var max = attrs.maxStars;
        if(angular.isUndefined(max)){
            max = 5;
        }

        for(var i = 0; i < max; i++){
            element.append('<li>&#9734;</li>');
        }

        // Draw the on stars
        var redraw = function(){
            var elements = element.find('li').removeClass('on');
            angular.forEach(elements, function(el, idx){
                if(idx < scope.value){
                    angular.element(el).addClass('on');
                }
            });
        };

        redraw();
        scope.$watch('value', function(){
            redraw();
        });
      }
    };
  });
