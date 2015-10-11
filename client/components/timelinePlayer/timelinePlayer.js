'use strict';

Components.TimelinePlayer = function (options) {

  var template = new Template('timelinePlayer', Template.timelinePlayer.renderFunction);
  var waitList = [];
  var waitListDependency = new Tracker.Dependency();
  var isPlaying = new ReactiveVar(false);
  var audioElements = [];
  var timeline = [];
  var playFrom = 0;
  
  var eventQueue = [];
  var eventsBeforeNextTick = [];
  var audioCurrentlyPlaying = {};
  var nextTickTimeout;
  var tickTimeInterval = 200;
  var currentEventIndex = 0;
  var currentPlaybackTime = 0;
  
  function triggerEvent (e) {
    if (e.type === 'AUDIO' && e.el) {
      if (e.what === 'start') {
        e.el.play();
        audioCurrentlyPlaying[e.staveId] = e;
      } else if (e.what === 'stop') {
        e.el.pause();
        delete audioCurrentlyPlaying[e.staveId];
      }
    }
  }
  
  function playEventQueue () {

    _.each(audioCurrentlyPlaying, function (e) {
      e.el.play();
    });
    
    (function nextTick() {
      
      eventsBeforeNextTick = [];

      while (eventQueue[currentEventIndex].when < currentPlaybackTime + tickTimeInterval) {
        eventsBeforeNextTick.push(_.extend({
          offset: eventQueue[currentEventIndex].when - currentPlaybackTime,
        }, eventQueue[currentEventIndex]));
        
        currentEventIndex += 1;
        if (currentEventIndex >= eventQueue.length) {
          break;
        }
      }
      
      _.each(eventsBeforeNextTick, function (e) {
        e.timeout = Meteor.setTimeout(function () {
          triggerEvent(e);
        }, e.offset);
      });
      
      nextTickTimeout = Meteor.setTimeout(function () {
        // console.log('timeprogress', currentPlaybackTime);
        currentPlaybackTime += tickTimeInterval;
        
        if (currentEventIndex < eventQueue.length) {
          nextTick();
        }
        
      }, tickTimeInterval);
    }());
  }
  
  function pauseEventQueue () {
    _.each(audioCurrentlyPlaying, function (e) {
      e.el.pause();
      e.el.currentTime = (currentPlaybackTime - e.when) / 1000;
    });
    _.each(eventsBeforeNextTick, function (e) {
      Meteor.clearTimeout(e.timeout);
    });
    Meteor.clearTimeout(nextTickTimeout);
  }
  
  function stopEventQueue () {
    
  }
  
  function seekEventQueue (toPosition) {
    
  }
  
  function isReady () {
    waitListDependency.depend();
    var allReady = _.all(waitList, function (ready) {
      return ready.get();
    });
    return allReady;
  }
  
  template.onRendered(function () {
    var allAudio = this.$('.allAudio');
    
    this.autorun(function () {
      var data = Template.currentData();
      
      timeline = data.toPlay || [];
      playFrom = data.playFrom || 0;
      waitList = [];
      audioElements = [];
      
      _.each(timeline, function (stave, i) {
        var ready = new ReactiveVar(false);
        var el;
        
        waitList.push(ready);
        
        if (stave.type === 'AUDIO') {
          el = document.createElement('audio');
          el.setAttribute('src', Helpers.fileUrl(stave.fileId));
          el.setAttribute('controls', 'controls');
          el.onloadeddata = function () {
            el.currentTime = stave.t0 / 1000;
          };
          el.oncanplay = function () {
            console.log('loaded file', stave.fileId);
            ready.set(true);
          };
          el.onseeking = function () {
            console.log('seeking started');
          };
          el.onseeked = function () {
            console.log('seeking done');
          };
          audioElements[i] = el;
          allAudio.append(el);
        } else {
          ready.set(true);
        }
      });
      waitListDependency.changed();
    });
    
  });
  
  template.events({
    'click [data-action=play]': function () {
      template.play();
    },
    'click [data-action=pause]': function () {
      template.pause();
    },
  });
  
  template.play = function () {
    // only play when ready ...
    if (!isReady()) {
      return;
    }
    
    isPlaying.set(true);
    
    _.each(timeline, function (stave, index) {
      // TODO: handle the case, when startTime > stave.x0
      if (stave.type === 'AUDIO') {
        eventQueue.push({
          el: audioElements[index],
          what: 'start',
          when: stave.x0,
          seek: stave.t0,
          type: stave.type,
          staveId: index,
        });
        eventQueue.push({
          el: audioElements[index],
          id: index,
          what: 'stop',
          when: stave.x1,
          type: stave.type,
          staveId: index,
        });
      } else if (stave.type === 'MIDI') {
        _.each(item.midi, function () {
          // ...
        });
      }
    });
    
    eventQueue.sort(function (a, b) {
      return a.when - b.when;
    });
    
    playEventQueue();
  };
  
  template.pause = function () {
    isPlaying.set(false);
    pauseEventQueue();
  };
  
  template.helpers({
    isReady: function () {
      return isReady();
    },
    isPlaying: function () {
      return isPlaying.get();
    },
  });

  return template;
};

