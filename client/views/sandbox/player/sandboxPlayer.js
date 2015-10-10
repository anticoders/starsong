'use strict';

Template.sandboxPlayer.onCreated(function () {
  this.keyboard = new Components.Keyboard({
    
  });
  this.player = new Components.MIDINotesEmitter({
    
  });
  this.recorder = new Components.MIDIRecorder({
    onStop: function (timeline) {
      console.log('recorderd sound:', timeline);
    }
  });
});

Template.sandboxPlayer.helpers({
  myKeyboard: function () {
    return Template.instance().keyboard;
  },
  myPlayer: function () {
    return Template.instance().player;
  },
  myRecorder: function () {
    return Template.instance().recorder;
  },
});

Template.sandboxPlayer.onRendered(function() {


});