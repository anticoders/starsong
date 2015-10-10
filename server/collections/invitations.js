Invitations.allow({

  insert: function(userId, doc) {
    var invitation = Invitations.findOne({email: doc.email});
    if(!invitation){
      var project = Projects.findOne(doc.projectId);
      if(project){
        return project.userId == userId;
      }
    }
  },

  update: function(userId, doc) {
    return false;
  },

  remove: function(userId, doc) {
    var project = Projects.findOne(doc.projectId);
    if(project){
      return project.userId == userId;
    }
  },

});
