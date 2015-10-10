ProjectTimelineController = ApplicationController.extend({
  waitOn: function() {
    return [
      Meteor.subscribe('project.one', this.params.projectId),
    ];
  },
  data: function() {
    var data = {
      project: Projects.findOne(this.params.projectId),
    };
    __data = data;
    return data;
  },
  onBeforeAction: function(){
    
  },
});

