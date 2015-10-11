'use strict';

Template.projectStem.onCreated(function() {
  var that = this;
  var x0 = 0;
  
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
      Utils.midiTime.set(progress - x0);
    },
  });
  
  this.autorun(function() {
    var time = Utils.midiTime.get();
    x0 = (that.data && that.data.stem && that.data.stem.x0) || 0;
    //console.log('x0', x0);
    if (!that.player.isPlaying()) {
      that.player.seek(time + x0);
    }
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

