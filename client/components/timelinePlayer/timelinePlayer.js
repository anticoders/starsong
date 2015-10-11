'use strict';

Components.TimelinePlayer = function (options) {

  var template = new Template('timelinePlayer', Template.timelinePlayer.renderFunction);
  var waitList = [];
  var waitListDependency = new Tracker.Dependency();
  var isPlaying = new ReactiveVar(false);
  var audioElements = {};
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
    var el;
    if (e.type === 'AUDIO') {
      el = audioElements[e.staveId];
      if (e.what === 'start') {
        if (el) {
          el.play();
        }
        audioCurrentlyPlaying[e.staveId] = e;
      } else if (e.what === 'stop') {
        if (el) {
          el.pause();
        }
        delete audioCurrentlyPlaying[e.staveId];
      }
    } else if (e.type === 'NOTE') {
      postal.publish({
        channel: 'notes',
        topic: e.what,
        data: {
          note: e.data.n,
          velocity: e.data.v,
          channel: e.data.ch,
        }
      });
    }
  }
  
  function prepareEventQueue (fromTimeline) {
    eventQueue = [];
    
    _.each(fromTimeline, function (stave, index) {
      // TODO: handle the case, when startTime > stave.x0
      if (stave.type === 'AUDIO') {
        eventQueue.push({
          what: 'start',
          when: stave.x0,
          seek: stave.t0,
          type: stave.type,
          staveId: index,
        });
        eventQueue.push({
          what: 'stop',
          when: stave.x1,
          type: stave.type,
          staveId: index,
        });
      } else if (stave.type === 'MIDI') {
        _.each(stave.midi, function (note) {
          eventQueue.push({
            what: 'start',
            data: note,
            when: stave.x0 + note.t0,
            type: 'NOTE',
            staveId: index,
          });
          eventQueue.push({
            data: note,
            what: 'stop',
            when: stave.x0 + note.t1,
            type: 'NOTE',
            staveId: index,
          });
        });
      }
    });
    
    eventQueue.sort(function (a, b) {
      return a.when - b.when;
    });
  }
  
  function playEventQueue () {

    _.each(audioCurrentlyPlaying, function (e) {
      var el = audioElements[e.staveId];
      if (el) {
        el.play();
      }
    });
    
    (function nextTick() {
      
      eventsBeforeNextTick = [];

      while (currentEventIndex < eventQueue.length &&
          eventQueue[currentEventIndex].when < currentPlaybackTime + tickTimeInterval) {

        eventsBeforeNextTick.push(_.extend({
          offset: eventQueue[currentEventIndex].when - currentPlaybackTime,
        }, eventQueue[currentEventIndex]));

        currentEventIndex += 1;
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
      var el = audioElements[e.staveId];
      if (el) {
        el.pause();
        el.currentTime = (currentPlaybackTime - e.when + e.seek) / 1000;
      }
    });
    _.each(eventsBeforeNextTick, function (e) {
      Meteor.clearTimeout(e.timeout);
    });
    Meteor.clearTimeout(nextTickTimeout);
  }
  
  function seekEventQueue (toPosition) {
    var e;
    
    // stop all timeouts ...
    _.each(eventsBeforeNextTick, function (e) {
      Meteor.clearTimeout(e.timeout);
    });
    Meteor.clearTimeout(nextTickTimeout);
    
    eventsBeforeNextTick = [];
    audioCurrentlyPlaying = {};
    currentEventIndex = 0;
    
    while (currentEventIndex < eventQueue.length && eventQueue[currentEventIndex].when < toPosition) {
      
      e = eventQueue[currentEventIndex];
      if (e.type === 'AUDIO') {
        if (e.what === 'start') {
          audioCurrentlyPlaying[e.staveId] = e;
        } else if (e.what === 'stop') {
          delete audioCurrentlyPlaying[e.staveId];
        }
      }
      currentEventIndex += 1;
    }
    
    currentPlaybackTime = toPosition;
    
    _.each(audioCurrentlyPlaying, function (e) {
      var el = audioElements[e.staveId];
      if (el) {
        el.currentTime = (toPosition - e.when) / 1000;
      }
    });
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
      audioElements = {};
      prepareEventQueue(timeline);
      
      allAudio.find('audio').attr('data-stave-id', 'toRemove');

      _.each(timeline, function (stave, i) {
        var ready = new ReactiveVar(false);
        var staveId = i;
        var el;
        var fileUrl = stave.fileId && Helpers.fileUrl(stave.fileId);
        
        waitList.push(ready);
        
        if (stave.type === 'AUDIO') {
          el = allAudio.find('[data-stave-id=toRemove][src="' + fileUrl + '"]').get(0);

          if (!el) {
            el = allAudio.find('[src="' + fileUrl + '"]').get(0);
            if (el) {
              el = el.cloneNode();
              allAudio.append(el);
            } else {
              el = document.createElement('audio');
              el.setAttribute('src', fileUrl);
              // el.setAttribute('controls', 'controls');
              allAudio.append(el);
            }
          } else {
            ready.set(true);
          }
          
          el.setAttribute('data-stave-id', staveId);
          audioElements[staveId] = el;
          
          el.onloadeddata = function () {
            console.log('STAVE', stave);
            el.currentTime = stave.t0 / 1000;
            // TODO: this should be configurable
            el.volume = 0.3;
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
        } else {
          ready.set(true);
        }
      });
      waitListDependency.changed();
    });
    
    allAudio.remove('audio[data-stave-id=toRemove]');
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
      console.warn('not ready! cannot play');
      return;
    }
    isPlaying.set(true);
    playEventQueue();
  };
  
  template.pause = function () {
    isPlaying.set(false);
    pauseEventQueue();
  };
  
  template.seek = function (toPosition) {
    seekEventQueue(toPosition);
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

