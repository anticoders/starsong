Projects.allow({

  insert: function(userId, doc) {
    return doc.userId == userId;
  },

  update: function(userId, doc) {
    return _.contains(doc.users, userId);
  },

  remove: function(userId, doc) {
    return doc.userId == userId;
  },

});








Meteor.publish('project.one', function(projectId) {
  var project = Projects.findOne(projectId);
  if(!project) return this.ready();

  return [
<<<<<<< HEAD
    Projects.find(projectId),
    Tracks.find({projectId: projectId}),
    Stems.find({projectId: projectId}),
=======
    Projects.find(project._id),
    Tracks.find({projectId: project._id}),
    Stems.find({projectId: project._id}),
    Invitations.find({projectId: project._id}),
>>>>>>> invitations view
  ];
});

Meteor.publish('projects.mine', function() {
  if(!this.userId) return this.ready();

  return [
    Projects.find({users: this.userId}),
  ];
});


// Meteor.publish('projects.fake', function() {
//   var project = Projects.findOne({_label: 'FAKE'});
//   if(!project) return this.ready();

//   return [
//     Projects.find(project._id),
//     Tracks.find({projectId: project._id}),
//     Stems.find({projectId: project._id}),
//   ];
// });


