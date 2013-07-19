'use strict';

ddescribe('Directive: rating', function () {
  beforeEach(module('test'));



  var element;
  var countStarsOn = function(element){
      var list = element.find('li');
      var count = 0;
      angular.forEach(list, function(el){
        if(angular.element(el).hasClass('on')) count ++;
      });
      return count;
    };

  it('should have the scpecified structure', inject(function ($rootScope, $compile) {
    element = angular.element('<rating></rating>');
    element = $compile(element)($rootScope);

    expect(element[0].nodeName).toBe('UL');
    expect(element.hasClass('rating')).toBe(true);

    var list = element.find('li');
    expect(list.length).toBe(5);

  }));

  it('should show the defined count of stars', inject(function ($rootScope, $compile) {
    element = angular.element('<rating max-stars="10"></rating>');
    element = $compile(element)($rootScope);

    var list = element.find('li');
    expect(list.length).toBe(10);

  }));

  it('should show the defined count of stars on', inject(function ($rootScope, $compile) {
    element = angular.element('<rating value="2"></rating>');
    element = $compile(element)($rootScope);

    expect(countStarsOn(element)).toBe(2);

  }));

  it('should change the stars on count if value change', inject(function ($rootScope, $compile) {
    $rootScope.value = 2;

    element = angular.element('<rating value="{{value}}"></rating>');
    element = $compile(element)($rootScope);

    expect(countStarsOn(element)).toBe(2);

    $rootScope.value = 4;
    $rootScope.$apply();

    expect(countStarsOn(element)).toBe(4);

  }));
});
