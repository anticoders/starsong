'use strict';

Helpers.registerAs('$');

Helpers.define('asset', function (path) {
  return Meteor.absoluteUrl() + 'assets' + path;
});

Helpers.define('equals', function (a, b) {
  // double equality intentional
  return a == b;
});

Helpers.define('isIn', function (what) {
  var last = arguments.length - 1;
  for(var idx = 1; idx < last; ++idx) {
    // double equality intentional
    if(what == arguments[idx]) return true;
  }
  return false;
  
});
