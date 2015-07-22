'use strict';

/* Filters */
//自定义过滤，将true转换为对号，null或false转换为叉

angular.module('phonecatFilters', []).filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
});
