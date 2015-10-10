

/*globals Invitations: true, Invitation: true*/

Invitation = function(doc) {
  'use strict';
  _.extend(this, doc);
};

Invitations = new Mongo.Collection('invitations', {
  transform: function(doc) {
    'use strict';
    return new Invitation(doc);
  },
});

Invitations.before.insert(function (userId, doc) {
  doc.token =  (new Mongo.ObjectID)._str;
  doc.accepted = false;
});


Invitations.after.insert(function(userId, doc){
  sendEmail(doc);
});

var sendEmail = function(doc){
  console.log("###########SEND EMAIL#############");
  console.log("TO: " + doc.email);
  console.log("URL: " + Meteor.absoluteUrl() + "timeline/" + doc.projectId + "?invitation_token=" + doc.token);
  console.log("###########END#############");
}
/*

  email:        String
  token:        String
  accepted:     String
  projectId:    projectId

*/
