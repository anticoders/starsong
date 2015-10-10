/*globals Projects: true, Project: true*/

Project = function(doc) {
  'use strict';
  _.extend(this, doc);
};

Projects = new Mongo.Collection('projects', {
  transform: function(doc) {
    'use strict';
    return new Projects(doc);
  },
});
