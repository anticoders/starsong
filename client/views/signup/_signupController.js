SignupController = RouteController.extend({
  layoutTemplate: 'loginLayout',
  onBeforeAction: function () {
    if (Meteor.userId()) {
      Router.go('onboarding');
    } else {
      this.next();
    }
  }
});
