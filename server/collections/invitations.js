Invitations.allow({

  insert: function(userId, doc) {
    var project = Projects.findOne(doc.projectId);
    if(project){
      return project.userId == userId;
    }
  },

  update: function(userId, doc) {
    var invitation = Invitations.findOne({email: doc.email});
    if(!invitation){
      var project = Projects.findOne(doc.projectId);
      if(project){
        return project.userId == userId;
      }
    }
  },

  remove: function(userId, doc) {
    var project = Projects.findOne(doc.projectId);
    if(project){
      return project.userId == userId;
    }
  },

});

Invitations.after.insert(function(userId, doc){
  sendEmail(doc);
});

var sendEmail = function(doc){
  console.log("###########SEND EMAIL#############");
  console.log("TO: " + doc.email);
  console.log("URL: " + Meteor.absoluteUrl() + "project/" + doc.projectId + "?invitationToken=" + doc.token);
  console.log("###########END#############");
};
