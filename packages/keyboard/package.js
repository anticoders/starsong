Package.describe({
  name: 'custom:keyboard',
  version: '0.0.0',
  description: 'A playable keyboard for Meteor', 
});

Package.onUse(function (api) {
  'use strict';
  
  api.versionsFrom('METEOR@1.2');
  
  api.use([
    'custom:postal@0.0.0',
    'custom:midijs@0.0.0',
    'reactive-var',
    'templating',
    'less',
    
  ], 'client');
  
  api.addFiles([
    
    'keyboard.less',
    'keyboard.html',
    'keyboard.js',

    'player.html',
    'player.js',
    
    'recorder.html',
    'recorder.js',
    
  ], 'client');
  
  api.export([
    'Recorder',
    'Keyboard',
    'Player',
  ]);
});

