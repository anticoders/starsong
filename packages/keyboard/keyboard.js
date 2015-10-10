/*globals Keyboard: true*/
'use strict';

Keyboard = function () {
  var template = new Template('keyboard', Template['__custom_keyboard'].renderFunction);
  var keys = {};
  
  template.helpers({
    keys: [
      { note: 47 },
      { note: 48 },
      { note: 49 },
      { note: 50 },
      { note: 51 },
      { note: 52 },
      { note: 53 },
      { note: 54 },
      { note: 55 },
      { note: 56 },
      { note: 57 },
      { note: 58 },
      { note: 59 },
      { note: 60 },
    ],
    isHalftone: function () {
      var note = this.note % 12;
      return note === 1 || note === 3 || note === 6 || note === 8 || note === 10;
    }
  });
  
  template.events({
    'click [data-action=play]': function (e) {
      playNote(this);
      $(e.target).addClass('active');
      setTimeout(function () {
        $(e.target).removeClass('active');
      }, 750);
    }
  });
  
  template.onRendered(function () {
    $(window).on('keydown', function (e) {
      if (keys[e.keyCode]) {
        // already down ...
        return;
      }
      keys[e.keyCode] = true;
      playNote({
        note: e.keyCode
      });
    });
    $(window).on('keyup', function (e) {
      keys[e.keyCode] = false;
    });
  });
  
  template.onDestroyed(function () {
    
  });
  
  return template;
};


function playNote (options) {
  MIDI.setVolume(0, 127);
  MIDI.noteOn(0, options.note, 127, 0);
  MIDI.noteOff(0, options.note, 0.75);
}


