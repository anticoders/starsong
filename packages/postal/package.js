Package.describe({
  name: 'custom:postal',
  version: '0.0.0',
  describe: 'Postal.js wrapped for Meteor',
});

Package.onUse(function (api) {
  'use strict';
  
  api.versionsFrom('METEOR@1.2');

  api.use([ 'underscore' ], 'client');

  api.addFiles([
    'postal.js',

  ], 'client');
  
  api.export('postal');
});
