ProjectStemController = ApplicationController.extend({

  waitOn: function() {
    return [
      Meteor.subscribe('project.one', this.params.projectId),
    ];
  },

  data: function() {
    var data = {
      project:  Projects.findOne(this.params.projectId),
      stem:     Stems.findOne(this.params.stemId),
    };


    __data = data;
    return data;
  },
});

