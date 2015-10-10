Projects.allow({

  insert: function(userId, doc) {
    return true; 
  },

  update: function(userId, doc) {
    return true; 
  },

  remove: function(userId, doc) {
    return true;
  },

});








Meteor.publish('projects', function() {

});

Meteor.publish('project', function(project) {
  var project = Projects.findOne(project._id);
  if(!project) return this.ready();

  return [
    Projects.find(project._id),
    Tracks.find({projectId: project._id}),
    Stems.find({projectId: project._id}),
  ];
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


