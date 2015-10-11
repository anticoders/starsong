Template.projectTimeline.onCreated(function() {
  this.emitter = new Components.MIDINotesEmitter({});
  this.player = new Components.TimelinePlayer({});
});


Template.projectTimeline.onDestroyed(function() {

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



