ApplicationController = RouteController.extend({
  layoutTemplate: 'applicationLayout',
  waitOn: function() {
    var token = this.params.query.invitationToken || Cookie.get("invitationToken");
    if(token){
      Cookie.set("invitationToken", token);
      return [
        Meteor.subscribe('project.one', this.params.projectId),
        Meteor.subscribe('project.token', token)
      ];
    }else{
      return [
        Meteor.subscribe('project.one', this.params.projectId),
      ];
    }
  },
  onBeforeAction: function(){
    if(this.params.projectId){
      Cookie.set('project.last', this.params.projectId);
    }
    if (!Meteor.userId()) {
      Router.go('signin');
    } else {
      this.next();
    }
  },
});

