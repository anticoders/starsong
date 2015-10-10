Template.sidebar.helpers({
  projectId: function() {
    if(Router.current().data){
      var project = Router.current().data().project;
      if(project) return project._id;
    }
  }
});