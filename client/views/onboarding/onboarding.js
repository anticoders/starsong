Template.onboarding.created = function() {
  Meteor.call('project.last',Cookie.get('project.last'), function(err,res){
    if(res) Router.go('project.timeline', {projectId: res});
  });
};