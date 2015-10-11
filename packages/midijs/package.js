Package.describe({
  name: 'custom:midijs',
  version: '0.0.0',
  describe: 'MIDI.js wrapped for Meteor',
});

Package.onUse(function (api) {
  'use strict';
  
  api.versionsFrom('METEOR@1.2');

  api.addFiles([
    'Base64Binary.js',
    'MIDI.js',
    
  ], 'client');
  
  api.addAssets([
    'acoustic_grand_piano-mp3.js',

    'electric_grand_piano-ogg.js',
    'electric_grand_piano-mp3.js',
    
  ], 'client');
  
  api.export('MIDI');
});
