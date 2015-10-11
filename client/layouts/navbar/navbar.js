Template.navbar.rendered = function () {
  this.$('.ui.dropdown').dropdown();
};

Template.navbar.helpers({
  email: function () {
    var user = Meteor.user();
    if(user){
      return user.emails[0].address
    }
  }, 
  projectId: function(){
    return Router.current().params.projectId;
  }
});

Template.navbar.events({
  'click [data-action=signout]': function (e) {
    e.preventDefault();
    Accounts.logout();
  }
});


