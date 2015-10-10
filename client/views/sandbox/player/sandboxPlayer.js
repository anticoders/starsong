'use strict';

Template.sandboxPlayer.onCreated(function () {
  this.keyboard = new Keyboard({
    
  });
});

Template.sandboxPlayer.helpers({
  myKeyboard: function () {
    return Template.instance().keyboard;
  }
});

Template.sandboxPlayer.onRendered(function() {
  MIDI.loadPlugin({
    
    soundfontUrl: '/packages/custom_midijs/',
    targetFormat: 'mp3',
    instrument: 'acoustic_grand_piano',
    onprogress: function(state, progress) {
      console.log(state, progress);
    },
    onsuccess: function() {
      console.log('done loading ...')
    }
  });

});