ProjectSettingsController = ApplicationController.extend({
  waitOn: function() {
    return [
      Meteor.subscribe('project.one', {_id: this.params._id}),
    ];
  },

  data: function() {
    var data = {
      project: Projects.findOne(this.params._id),
    };
    return data;
  },
});

