'use strict';

Template.sandboxPlayer.onCreated(function () {
  this.keyboard = new Components.Keyboard({
    
  });
  this.emitter = new Components.MIDINotesEmitter({
    
  });
  this.recorder = new Components.MIDIRecorder({
    onStop: function (timeline) {
      console.log('recorderd sound:', timeline);
    }
  });
  this.player = new Components.TimelinePlayer({});
});

Template.sandboxPlayer.helpers({
  myKeyboard: function () {
    return Template.instance().keyboard;
  },
  myPlayer: function () {
    return Template.instance().player;
  },
  myEmitter: function () {
    return Template.instance().emitter;
  },
  myRecorder: function () {
    return Template.instance().recorder;
  },
  timeline: function () {
    return [
      { type: 'AUDIO', fileId: 'bright-leady-guitar.mp3', x0: 0, x1: 3000, t0: 3000 },
      { type: 'AUDIO', fileId: 'bright-leady-guitar.mp3', x0: 3000, x1: 9000, t0: 0 },
      { type: 'AUDIO', fileId: 'bright-leady-guitar.mp3', x0: 6000, x1: 12000, t0: 0 },
    //  { type: 'AUDIO', fileId: 'a-team_intro.wav', x0: 6000, x1: 10000, t0: 5000 },
    ];
  },
});

Template.sandboxPlayer.onRendered(function() {

  //this.player.play();

});
