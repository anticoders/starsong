

/*globals Projects: true, Project: true*/

Project = function(doc) {
  'use strict';
  _.extend(this, doc);
};

Projects = new Mongo.Collection('projects', {
  transform: function(doc) {
    'use strict';
    return new Project(doc);
  },
});


_.extend(Project.prototype, {

  tracks: function() {
    return Tracks.find({
      projectId: this._id,
    }, {
      sort: {order: 1},
    });
  },

  timeline: function() {
    var stems = Stems.find({
      projectId: this._id,
    }).fetch();
    var count = Stems.find({
      projectId: this._id,
    }).count();

    return stems;
  },


});



Projects.before.insert(function (userId, doc) {

  doc.length = 60;
  doc.userId = userId;
  doc.users  = [userId];
  doc.createdAt = Date.now();

});

if(Meteor.isServer) {

  Projects.after.insert(function(userId, doc) {
    _.times(4, function(idx) {
      Tracks.insert({
        projectId:      doc._id,
        order:          idx,
        name:           'Track ' + idx,
      });
    });

  });

}




/*

  name:         String
  description:  String
  userId:       UserId (owner)
  users:        [UserId]

  length:       Number (length in seconds)


  _label:       DEVELOPMENT ONLY

*/
