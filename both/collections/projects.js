
Project = function(doc) {
  _.extend(this, doc);
};

Projects = new Mongo.Collection('projects', {
  transform: function(doc) {
    return new Projects(doc);
  },
});





