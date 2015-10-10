'use strict';

Helpers.registerAs('$');

Helpers.define('asset', function (path) {
  return Meteor.absoluteUrl() + 'assets' + path;
});

Helpers.define('equals', function (a, b) {
  // double equality intentional
  return a == b;
});
