'use strict';

var MIDIPluginLoaded = new ReactiveVar(false);

Components.MIDINotesEmitter = function () {
  var template = new Template('MIDINotesEmitter', Template.MIDINotesEmitter.renderFunction);
  
  template.onCreated(function () {
    this.notesListener = postal.subscribe({
      channel: 'notes',
      topic: '*',
      callback: function (data, envelope) {
        var note = data.note;
        var channel = data.channel || 0;
        var velocity = data.velocity || 127;
        
        if (!MIDIPluginLoaded.get()) {
          return;
        }
        if (envelope.topic === 'stop') {
          MIDI.noteOff(channel, note);
        } else if (envelope.topic === 'start') {
          // MIDI.setVolume(0, 127);
          MIDI.noteOn(channel, note, velocity, 0);
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
