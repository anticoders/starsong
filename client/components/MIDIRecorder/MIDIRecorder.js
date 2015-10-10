'use strict';

Components.MIDIRecorder = function (options) {
  var template = new Template('recorder', Template['MIDIRecorder'].renderFunction);
  var timeline = [];
  var notes = {};
  
  template.events({
    'click [data-action=stop]': function (e, t) {
      if (options.onStop) {
        options.onStop(timeline);
      }
      t.stopRecording();
    }
  });
  
  template.helpers({
    currentRecordingTime: function () {
      return Template.instance().currentRecordingTime.get();
    }
  });
  
  template.onCreated(function () {

    var currentRecordingTime = new ReactiveVar(0);
    var recordingStartTime = Date.now();
    var isRecording = true;
  
    var handle = Meteor.setInterval(function () {
      currentRecordingTime.set(Date.now() - recordingStartTime);
    }, 200);
    
    this.currentRecordingTime = currentRecordingTime;
    
    this.stopRecording = function () {
      isRecording = false;
      Meteor.clearInterval(handle);
    };
    
    this.notesListener = postal.subscribe({
      channel: 'notes',
      topic: '*',
      callback: function (data, envelope) {
        if (!isRecording) {
          return;
        }
        if (envelope.topic === 'start') {
          notes[data.note] = Date.now();
        } else if (envelope.topic === 'stop') {
          if (!notes[data.note]) {
            // strange ... this should not happen ...
          } else {
            timeline.push({
              note: data.note,
              startTime: notes[data.note] - recordingStartTime,
              stopTime: Date.now() - recordingStartTime,
            });
          }
        }
      }
    });
  });

  template.onDestroyed(function () {
    this.notesListener.unsubscribe();
    this.stopRecording();
  });
  
  return template;
};
