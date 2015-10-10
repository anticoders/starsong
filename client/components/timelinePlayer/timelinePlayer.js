'use strict';

Components.TimelinePlayer = function (options) {
  var template = new Template('timelinePlayer', Template.timelinePlayer.renderFunction);
  var audioFiles = new ReactiveVar([]);
  var timelineEvents = [];
  var timelineEventsDependency = new Tracker.Dependency();
  
  template.play = function (timeline, startTime) {
    
    var newAudioFiles = [];
    
    startTime = startTime || 0;
    
    _.each(timeline, function (item, index) {
      // TODO: handle the case, when startTime > item.x0
      if (item.type === 'AUDIO') {
        newAudioFiles.push({
          index: index,
          fileId: item.fileId,
        });
        timelineEvents.push({
          what: 'start',
          when: item.x0 - startTime,
          seek: item.t0,
          type: item.type,
          index: index,
        });
        timelineEvents.push({
          what: 'stop',
          when: item.x1,
          type: item.type,
          index: index,
        });
      } else if (item.type === 'MIDI') {
        _.each(item.midi, function () {
          // ...
        });
      }
      audioFiles.set(newAudioFiles);
    });
    
    timelineEvents.sort(function (a, b) {
      return a.when - b.when;
    });
    
    timelineEventsDependency.changed();
    
    console.log(timelineEvents);
    
    // _.each(timeline, function (item) {
    //   if (item.type === 'AUDIO') {
    //     files.push(new Audio(Helpers.fileUrl(item.fileId)));
    //   }
    // });
  };
  
  template.stop = function () {
    audioFiles.set([]);
  };
  
  template.helpers({
    audioFiles: function () {
      return audioFiles.get();
    }
  });
  
  template.onRendered(function () {
    
    var that = this;
    
    that.autorun(function () {
      timelineEventsDependency.depend();
      
      Tracker.afterFlush(function () {
        // TODO: use queue rather than creating a ton of timeouts
        _.each(timelineEvents, function (event) {
          var el = that.$('[data-index=' + event.index + ']').get(0);
          if (el && event.seek) {
            console.log('setting seek to', event.seek);
            el.currentTime = event.seek;
          }
          console.log('parse event', el, event);
          Meteor.setTimeout(function () {
            console.log('trigger event', event);
            if (event.type === 'AUDIO') {
              if (event.what === 'start') {
                // TODO: set the current time right after the elements are rendered ...
                console.log('playing element', el);
                el.play();
              } else if (event.what === 'stop') {
                console.log('pause element', el);
                el.pause();
              }
            }
          }, event.when);
        }); 
      });
    });
   
    
    // var audio = new Audio(Helpers.asset('/a-team_intro.wav'));
    // audio.currentTime = 5;
    // audio.play();
    // setTimeout(function () {
    //   audio.pause();
    // }, 10 * 1000);
  });
  
  return template;
};

