Template.sidebar.helpers({
  projectId: function() {
    var project = Router.current().data().project;
    if(project) return project._id;
  }
});