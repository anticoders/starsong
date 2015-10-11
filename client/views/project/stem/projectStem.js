'use strict';

Template.projectStem.onCreated(function() {
  this.keyboard = new Components.Keyboard({
    
  });
  this.emitter = new Components.MIDINotesEmitter({
    
  });
  // this.recorder = new Components.MIDIRecorder({
  //   onStop: function (timeline) {
  //     console.log('recorderd sound:', timeline);
  //   }
  // });
  this.player = new Components.TimelinePlayer({
    onProgress: function(progress) {
      Utils.midiTime.set(progress);
    },
  });
});

Template.projectStem.helpers({
  myKeyboard: function () {
    return Template.instance().keyboard;
  },
  myPlayer: function () {
    return Template.instance().player;
  },
  myEmitter: function () {
    return Template.instance().emitter;
  },
  // myRecorder: function () {
  //   return Template.instance().recorder;
  // },

  timeline: function() {
    return [this.stem];
  },
});

