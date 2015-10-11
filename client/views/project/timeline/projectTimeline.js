


Template.projectTimeline.onCreated(function() {
  this.emitter = new Components.MIDINotesEmitter({});
  this.player = new Components.TimelinePlayer({});

  Utils.timelinePlayer = this.player;
});


Template.projectTimeline.onDestroyed(function() {
  delete Utils.timelinePlayer;
});


Template.projectTimeline.helpers({
  myPlayer: function () {
    return Template.instance().player;
  },

  myEmitter: function () {
    return Template.instance().emitter;
  },

  timeline: function() {
    return this.project.timeline();
    // var stems = Stems.find({projectId: this.project._id});
    // return Stems.find({projectId: this.project._id}).fetch();
  },

});



