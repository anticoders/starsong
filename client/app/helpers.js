'use strict';

Helpers.registerAs('$');

Helpers.define('asset', function (path) {
  return Meteor.absoluteUrl() + 'assets' + path;
});

Helpers.define('equals', function (a, b) {
  // double equality intentional
  return a == b;
});

Helpers.define('formatElapsedTime', function (ms) {
  var seconds = Math.floor(ms / 1000);
  var minutes = Math.floor(ms / 60000);
  return (minutes <= 9 ? '0' : '') + minutes + ':' + (seconds <= 9 ? '0' : '') + seconds;
});