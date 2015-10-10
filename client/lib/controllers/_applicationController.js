ApplicationController = RouteController.extend({
  layoutTemplate: 'applicationLayout',
  onBeforeAction: function(){
    if (!Meteor.userId()) {
      Router.go('signin');
    } else {
      this.next();
    }
  }
});

