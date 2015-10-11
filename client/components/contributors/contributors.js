var invitationErrors = new ReactiveVar();

Template.contributors.rendered = function () {
  invitationErrors.set(null);
  $('.ui.search').search({
    apiSettings: {
      url: '/users?email={query}'
    },
    fields: {
      results : 'users',
      title   : 'email',
      url     : '#'
    },
    minCharacters : 3
  });
};

Template.contributors.helpers({
  errors: function () {
    return invitationErrors.get();
  },
  invitations: function() {
    return Invitations.find();
  }
});

Template.contributors.events({
  'submit [data-action=invite]': function (e) {
    e.preventDefault();
    var invitation = $(e.target).serializeObject();
    var errors = [];
    if(!invitation.email){
      errors.push("Emails address can't be empty.");
    }
    if(invitation.email && !/\S+@\S+\.\S+/.test(invitation.email)){
      errors.push("Please enter valid email address.")
    }
    if(!this.project){
      errors.push("No projec selected.");
    }
    if(errors.length > 0){
      invitationErrors.set(errors);
    }else{
      invitationErrors.set(null);
      Invitations.insert({
        email: invitation.email,
        projectId: this.project._id
      });
      $('input[name=email]').val('');
    }
  },
  'click [data-action=remove]': function(e){
    e.preventDefault();
    Invitations.remove(this._id);
  }
});

