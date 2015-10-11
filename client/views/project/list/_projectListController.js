ProjectListController = ApplicationController.extend({
  waitOn: function() {
    return [
      Meteor.subscribe('projects.mine'),
    ];
  },

  data: function() {
    var data = {
      projects: Projects.find({}, {
        sort: {name: 1},
      }),
    };

    __data = data;
    return data;
  },
});
