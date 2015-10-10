Package.describe({
  name: 'custom:keyboard',
  version: '0.0.0',
  description: 'A playable keyboard for Meteor', 
});

Package.onUse(function (api) {
  'use strict';
  
  api.versionsFrom('METEOR@1.2');
  
  api.use([
    'custom:midijs@0.0.0',
    'templating',
    'less',
    
  ], 'client');
  
  api.addFiles([
    
    'keyboard.less',
    'keyboard.html',
    'keyboard.js',
    
  ], 'client');
  
  api.export('Keyboard');
});

