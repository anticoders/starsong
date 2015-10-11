Stems.allow({

  insert: function(userId, doc) {
    var project = Projects.findOne(doc.projectId);
    if(project){
      return _.contains(project.users, userId);;
    }
  },

  update: function(userId, doc) {
    var project = Projects.findOne(doc.projectId);
    if(project){
      return _.contains(project.users, userId);;
    }
  },

  remove: function(userId, doc) {
    var project = Projects.findOne(doc.projectId);
    if(project){
      return _.contains(project.users, userId);;
    }
  },

});






