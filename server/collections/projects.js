Meteor.publish('projects', function() {

});


Meteor.publish('projects.fake', function() {
  var project = Projects.findOne({_label: 'FAKE'});
  if(!project) return this.ready();

  return [
    Projects.find(project._id),
    Tracks.find({projectId: project._id}),
    Stems.find({projectId: project._id}),
  ];
});


