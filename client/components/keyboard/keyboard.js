'use strict';

Components.Keyboard = function () {
  var template = new Template('keyboard', Template.keyboard.renderFunction);
  var keys = {};
  
  template.helpers({
    keys: _.map(_.range(48, 73), function(note) {
      return {note: note};
    }),
    // [
    //   { note: 48 },
    //   { note: 49 },
    //   { note: 50 },
    //   { note: 51 },
    //   { note: 52 },
    //   { note: 53 },
    //   { note: 54 },
    //   { note: 55 },
    //   { note: 56 },
    //   { note: 57 },
    //   { note: 58 },
    //   { note: 59 },
    //   { note: 60 },
    //   { note: 61 },
    //   { note: 62 },
    //   { note: 63 },
    //   { note: 64 },
    // ],
    isHalftone: function () {
      var note = (this.note - MIDI.keyToNote.C1) % 12;
      return note === 1 || note === 3 || note === 6 || note === 8 || note === 10;
    }
  });
  
  function publishNote (topic, data) {
    postal.publish({
      channel: 'notes',
      topic: topic,
      data: data
    });
  }  
  
  template.events({
    'mousedown [data-action=play]': function () {
      publishNote('start', this);
    },
    'mouseup [data-action=play]': function () {
      publishNote('stop', this);
    },
    // TODO: this is strange ...
    // 'mouseleave [data-action=play]': function () {
    //   publishNote('stop', this);
    // }
  });
  
  template.onRendered(function () {
    
    var el = this.$('.keyboard');
    
    $(window).on('keydown', function (e) {
      if (keys[e.keyCode]) {
        // already down ...
        return;
      }
      keys[e.keyCode] = true;
      publishNote('start', { note: e.keyCode });
    });
    
    $(window).on('keyup', function (e) {
      keys[e.keyCode] = false;
      publishNote('stop', { note: e.keyCode });
    });
    
    this.listenNotes = postal.subscribe({
      channel: 'notes',
      topic: '*',
      callback: function (data, envelope) {
        var $key = el.find('[data-note=' + data.note + ']');
        if (envelope.topic === 'start') {
          $key.addClass('active');
        } else if (envelope.topic === 'stop') {
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





