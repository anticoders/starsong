Meteor.methods({
  'project.last': function(projectId){
    var project = null;
    if(projectId){
      project = Projects.findOne({$and: [{_id: projectId}, {userId: Meteor.userId()}]});
    }
    if(!project){
      project = Projects.findOne({userId: Meteor.userId()});
    }
    if(project){
      return project._id;
    }
  }
});