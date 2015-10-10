'use strict';

var MIDIPluginLoaded = new ReactiveVar(false);

Components.MIDINotesEmitter = function () {
  var template = new Template('player', Template.MIDINotesEmitter.renderFunction);
  
  template.onCreated(function () {
    this.notesListener = postal.subscribe({
      channel: 'notes',
      topic: 'note.*',
      callback: function (data, envelope) {
        if (!MIDIPluginLoaded.get()) {
          return;
        }
        if (envelope.topic === 'note.stop') {
          MIDI.noteOff(0, data.note);
        } else if (envelope.topic === 'note.start') {
          MIDI.setVolume(0, 127);
          MIDI.noteOn(0, data.note, 127, 0);
        }
      }
    });
  });
  
  template.onRendered(function () {
    if (MIDIPluginLoaded.get()) {
      return;
    }
    MIDI.loadPlugin({
      soundfontUrl: '/packages/custom_midijs/',
      targetFormat: 'mp3',
      instrument: 'acoustic_grand_piano',
      onprogress: function(state, progress) {
        console.log(state, progress);
      },
      onsuccess: function() {
        console.log('done loading ...');
        MIDIPluginLoaded.set(true);
      }
    });
  });
  
  template.onDestroyed(function () {
    this.notesListener.unsubscribe();
  });

  return template;
};
