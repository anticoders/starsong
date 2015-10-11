var result = {
  error: new ReactiveVar(false),
  success: new ReactiveVar(false)
};

Template.projectSettings.rendered = function () {
  result.error.set(false);
  result.success.set(false);
};

Template.projectSettings.helpers({
  error: function () {
    return result.error.get();
  },
  success: function() {
    return result.success.get();
  }
});

Template.projectSettings.events({ 
  'submit [data-action=projectSettings]': function (e) {
    e.preventDefault();
    var projectId = this.project._id;
    Projects.update(projectId, {$set: $(e.target).serializeObject()}, function(err,res){
      if(err){
        result.error.set(true);
      }else{
        result.success.set(true);
      }
    });
  },
});








