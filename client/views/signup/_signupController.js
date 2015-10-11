SignupController = RouteController.extend({
  layoutTemplate: 'loginLayout',
  onBeforeAction: function () {
    if (Meteor.userId()) {
      Router.go('project.list');
    } else {
      this.next();
    }
  }
});
