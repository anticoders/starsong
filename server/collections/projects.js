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


Meteor.publish('project.token', function(token) {
  if(token && this.userId){
    var invitation = Invitations.findOne({token: token});
    var user = Meteor.users.findOne(this.userId);
    if(invitation && !invitation.accepted && user.emails[0].address == invitation.email){
      Invitations.update(invitation._id, {$set: {accepted: true}});
      var project = Projects.findOne(invitation.projectId);
      Projects.update(project._id, {$addToSet: {users: this.userId}});
    }
  }
  return this.ready();
});


Meteor.publish('project.one', function(projectId) {
  var project = Projects.findOne({$and: [{_id:projectId}, {users: this.userId}]});
  if(!project) return this.ready();

  return [
    Projects.find(projectId),
    Tracks.find({projectId: projectId}),
    Stems.find({projectId: projectId}),
    Invitations.find({projectId: projectId}),

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


