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
    'mousedown [data-action=play]': function () {
      postal.publish({
        channel: 'notes',
        topic: 'note.start',
        data: this
      });
    },
    'mouseup [data-action=play]': function () {
      postal.publish({
        channel: 'notes',
        topic: 'note.stop',
        data: this
      });
    },
    'mouseleave [data-action=play]': function () {
      postal.publish({
        channel: 'notes',
        topic: 'note.stop',
        data: this
      });
    }
  });
  
  template.onRendered(function () {
    
    var el = this.$('.__custom_keyboard');
    
    $(window).on('keydown', function (e) {
      if (keys[e.keyCode]) {
        // already down ...
        return;
      }
      keys[e.keyCode] = true;
      postal.publish({
        channel: 'notes',
        topic: 'note.start',
        data: {
          note: e.keyCode,
        }
      });
    });
    
    $(window).on('keyup', function (e) {
      keys[e.keyCode] = false;
      postal.publish({
        channel: 'notes',
        topic: 'note.stop',
        data: {
          note: e.keyCode,
        }
      });
    });
    
    this.listenNotes = postal.subscribe({
      channel: 'notes',
      topic: 'note.*',
      callback: function (data, envelope) {
        var $key = el.find('[data-note=' + data.note + ']');
        if (envelope.topic === 'note.start') {
          $key.addClass('active');
        } else if (envelope.topic === 'note.stop') {
          $key.removeClass('active');
        }
      }
    });
  });
  
  template.onDestroyed(function () {
    this.listenNotes.unsubscribe();
  });
  
  return template;
};
