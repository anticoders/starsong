Template.projectCreator.events({
  
  'submit [data-action=create]': function (e) {
    e.preventDefault();
    var project = $(e.target).serializeObject();
    var projectId = Projects.insert(project);
    Router.go('project.timeline', {projectId: projectId});
  },

});