Template.projectList.helpers({
  empty: function () {
    return Projects.find().count() == 0;
  },
  invited: function(){
    return this.userId != Meteor.userId();
  }
});