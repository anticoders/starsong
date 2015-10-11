ProjectTimelineController = ApplicationController.extend({
  data: function() {
    var data = {
      project: Projects.findOne(this.params.projectId),
    };
    __data = data;
    return data;
  },
});

