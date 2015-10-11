HomeController = RouteController.extend({
  layoutTemplate: 'emptyLayout',
  onBeforeAction: function () {
    if (Meteor.userId()) {
      Router.go('project.list');
    } else {
      this.next();
    }
  }
});


