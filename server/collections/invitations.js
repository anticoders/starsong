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
  var url = Meteor.absoluteUrl() + "project/" + doc.projectId + "?invitationToken=" + doc.token;
  Email.send({
    from: 'StarSong <invitation@starsong.com>',
    to: doc.email,
    subject: "Invitation to STAR SONG project",
    html: 'Hi, you just received invitation to STAR SONG project - <a href="' + url +'">Click here</a>'
  });
};
