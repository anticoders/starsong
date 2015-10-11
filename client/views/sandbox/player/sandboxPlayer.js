'use strict';

Template.sandboxPlayer.onCreated(function () {
  this.keyboard = new Components.Keyboard({
    
  });
  this.emitter = new Components.MIDINotesEmitter({
    
  });
  this.recorder = new Components.MIDIRecorder({
    onStop: function (timeline) {
      console.log('recorderd sound:', timeline);
    }
  });
  this.player = new Components.TimelinePlayer({});
  
  this.timeline = new ReactiveVar([
    {       type: 'AUDIO',
           fileId: 'bright-leady-guitar.mp3',
      t0: 1000, x0: 0, x1: 5000 },
    {        type: 'AUDIO',
           fileId: 'bright-leady-guitar.mp3', t0: 0, x0: 5000, x1: 11000 },
           
    {"_id":"osn5P2mD6XnAM5dpJ","projectId":"PwHbw9qgdEYZTMTfY","trackId":"tnvZd3miEsBooY4p6","x0":1020,"x1":11020,"type":"MIDI","midi":[{"_id":"vsgsRSesRej9tGhuo","n":32,"t0":4320,"t1":7320,"ch":0,"vol":127,"vel":127,"idx":0},{"_id":"m4WLEdqqpbeiZib2Y","n":45,"t0":780,"t1":2830,"ch":0,"vol":127,"vel":127,"idx":1},{"_id":"cT44tEeC5Pp5ZLm4u","n":47,"t0":2059,"t1":4083,"ch":0,"vol":127,"vel":127,"idx":2},{"_id":"jFh6f8KdzvwadaQFb","n":44,"t0":4321,"t1":5833,"ch":0,"vol":127,"vel":127,"idx":3},{"_id":"mrKx3DcGrepetTALh","n":62,"t0":1320,"t1":4360,"ch":0,"vol":127,"vel":127,"idx":4},{"_id":"TcwNjJKvraqceGkEW","n":60,"t0":4000,"t1":4250,"ch":0,"vol":127,"vel":127,"idx":5},{"_id":"gNjzW4f5njkKrLCuX","n":68,"t0":320,"t1":570,"ch":0,"vol":127,"vel":127,"idx":6},{"_id":"SsJP3M5zXCE2Yhtja","n":67,"t0":640,"t1":890,"ch":0,"vol":127,"vel":127,"idx":7},{"_id":"z5M3HLjDvtFKimTpr","n":66,"t0":940,"t1":1190,"ch":0,"vol":127,"vel":127,"idx":8},{"_id":"gKGReTkfzdTkHWJBz","n":65,"t0":1280,"t1":1530,"ch":0,"vol":127,"vel":127,"idx":9},{"_id":"o7ETkjoRbRAziz2LC","n":48,"t0":4320,"t1":5960,"ch":0,"vol":127,"vel":127,"idx":10},{"_id":"LoBbXYtxtZtxZsokk","n":52,"t0":5300,"t1":6100,"ch":0,"vol":127,"vel":127,"idx":11},{"_id":"nK3FsYJmCDN72sWNd","n":55,"t0":5880,"t1":6960,"ch":0,"vol":127,"vel":127,"idx":12},{"_id":"zX8g9LJFogw8tn4t3","n":60,"t0":6340,"t1":7480,"ch":0,"vol":127,"vel":127,"idx":13},{"_id":"QGrybibvFHSqfGMZN","n":48,"t0":6960,"t1":7210,"ch":0,"vol":127,"vel":127,"idx":14},{"_id":"pLsLNq3qmL3C8byXz","n":48,"t0":7700,"t1":7950,"ch":0,"vol":127,"vel":127,"idx":15},{"_id":"TWdxqtDB6fkCzB8qd","n":48,"t0":8580,"t1":8700,"ch":0,"vol":127,"vel":127,"idx":16},{"_id":"DZX7osQoawDDJXE7n","n":48,"t0":8840,"t1":8960,"ch":0,"vol":127,"vel":127,"idx":17},{"_id":"tr5xMX4RNAKFTZDZj","n":48,"t0":9100,"t1":9420,"ch":0,"vol":127,"vel":127,"idx":18}]},
  ]);
});

Template.sandboxPlayer.events({
  'click [data-action=add]': function (e, t) {
    var timeline = t.timeline.get();
    timeline.push({
       type: 'AUDIO',
       fileId: 'bright-leady-guitar.mp3',
       t0: 0, x0: 6000 * timeline.length, x1: 6000 * (timeline.length + 1)
    });
    console.log(timeline);
    t.timeline.set(timeline);
  }
});

Template.sandboxPlayer.helpers({
  myKeyboard: function () {
    return Template.instance().keyboard;
  },
  myPlayer: function () {
    return Template.instance().player;
  },
  myEmitter: function () {
    return Template.instance().emitter;
  },
  myRecorder: function () {
    return Template.instance().recorder;
  },
  timeline: function () {
    return Template.instance().timeline.get();
  },
});

Template.sandboxPlayer.onRendered(function() {

  // setTimeout(function () {
  //   this.player.seek(5000);
  // }.bind(this), 5000);

});
