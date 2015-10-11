ProjectSettingsController = ApplicationController.extend({
  data: function() {
    var data = {
      project: Projects.findOne(this.params._id),
    };
    return data;
  },
});

