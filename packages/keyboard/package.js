Package.describe({
  name: 'custom:keyboard',
  version: '0.0.0',
  description: 'A playable keyboard for Meteor', 
});

Package.onUse(function (api) {
  'use strict';
  
  api.versionsFrom('METEOR@1.0');
  
  api.use([
    'templating',
    
  ], 'client');
  
  api.addFiles([
    
    'keyboard.css',
    'keyboard.html',
    'keyboard.js',
    
  ], 'client');
  
  api.export('Keyboard');
});

