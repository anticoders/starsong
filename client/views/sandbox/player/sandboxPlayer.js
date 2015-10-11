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
  
  this.timeline = new ReactiveVar([
    {       type: 'AUDIO',
           fileId: 'bright-leady-guitar.mp3',
      t0: 1000, x0: 0, x1: 5000 },
    {        type: 'AUDIO',
           fileId: 'bright-leady-guitar.mp3', t0: 0, x0: 5000, x1: 11000 },
  ]);
});

Template.sandboxPlayer.events({
  'click [data-action=add]': function (e, t) {
    var timeline = t.timeline.get();
    timeline.push({
       type: 'AUDIO',
       fileId: 'bright-leady-guitar.mp3',
       t0: 0, x0: 6000 * timeline.length, x1: 6000 * (timeline.length + 1)
    });
    console.log(timeline);
    t.timeline.set(timeline);
  }
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
    return Template.instance().timeline.get();
  },
});

Template.sandboxPlayer.onRendered(function() {

  // setTimeout(function () {
  //   this.player.seek(5000);
  // }.bind(this), 5000);

});
