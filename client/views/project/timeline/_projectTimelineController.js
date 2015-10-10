ProjectTimelineController = ApplicationController.extend({
  waitOn: function() {
    return [
      Meteor.subscribe('project.one', this.params.projectId),
    ];
  },
  data: function() {
    var data = {
      project: Projects.findOne(this.params.projectId),
    };
    __data = data;
    return data;
  },
  onBeforeAction: function(){
    var token = this.params.query.invitationToken;
    var invitation = Invitations.findOne({token: token});
    if(token && invitation){
      if (!Meteor.userId()) {
        //dodaj do projektu :)
      } else {
        var user = Meteor.users.findOne({'emails.address': invitation.email});
        if(user){
          Router.go('signup',{},{query: {invitationToken: token}});
        }else{
          Router.go('signup',{},{query: {invitationToken: token}});
        }
      }
    }else{
      if (!Meteor.userId()) {
        Router.go('signin');
      } else {
        this.next();
      }
    }
  },
});

