Template.projectSettings.events({
  'submit [data-action=projectSettings]': function (e) {
    e.preventDefault();
    var projectId = this.project._id;
    Projects.update(projectId, {$set: $(e.target).serializeObject()});
  }
});




