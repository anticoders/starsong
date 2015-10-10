'use strict';

Template.sandboxPlayer.onCreated(function () {
  this.keyboard = new Keyboard();
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
      var delay = 0; // play one note every quarter second
      var note = 50; // the MIDI note
      var velocity = 127; // how hard the note hits
      // play the note
      // MIDI.setVolume(0, 127);
      // MIDI.noteOn(0, note, velocity, delay);
      // MIDI.noteOff(0, note, delay + 0.75);
    }
  });

});