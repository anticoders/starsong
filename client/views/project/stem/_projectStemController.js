ProjectStemController = ApplicationController.extend({

  waitOn: function() {
    return [
      Meteor.subscribe('project.one', this.params.projectId),
    ];
  },

  data: function() {
    var stem = Stems.findOne(this.params.stemId);

    var data = {
      project:  Projects.findOne(this.params.projectId),
      track:    Tracks.findOne(stem && stem.trackId),
      stem:     stem,
    };


    __data = data;
    return data;
  },
});

