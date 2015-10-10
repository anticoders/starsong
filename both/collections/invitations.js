

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

/*

  email:        String
  token:        String
  accepted:     String
  projectId:    projectId

*/
