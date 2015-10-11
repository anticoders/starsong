ProjectInviteController = ApplicationController.extend({
  data: function() {
    var data = {
      project: Projects.findOne(this.params.projectId),
    };
    return data;
  },
});

