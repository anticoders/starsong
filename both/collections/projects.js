

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


});


/*

  name:         String
  userId:       UserId (owner)
  users:        [UserId]




  _label:       DEVELOPMENT ONLY

*/
