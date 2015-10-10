'use strict';

Template.sandboxPlayer.onCreated(function () {
  this.keyboard = new Keyboard({
    
  });
  this.player = new Player({
    
  });
  this.recorder = new Recorder({
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