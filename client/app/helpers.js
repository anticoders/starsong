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
  var seconds = Math.floor(ms / 1000) % 60;
  var minutes = Math.floor(ms / 60000);
  return (minutes <= 9 ? '0' : '') + minutes + ':' + (seconds <= 9 ? '0' : '') + seconds;
});

Helpers.define('isIn', function (what) {
  var last = arguments.length - 1;
  for(var idx = 1; idx < last; ++idx) {
    // double equality intentional
    if(what == arguments[idx]) return true;
  }
  return false;
});

Helpers.define('fileUrl', function (fileId) {
  return 'https://s3-us-west-2.amazonaws.com/' + Meteor.settings.public.bucketName + '/' + fileId; 
});
