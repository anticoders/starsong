SandboxTrackerController = RouteController.extend({

  waitOn: function() {
    return [
      Meteor.subscribe('projects.fake'),
    ];
  },

  data: function() {
    var data = {
      project: Projects.findOne(),
    };

    __data = data;
    return data;
  },

});


