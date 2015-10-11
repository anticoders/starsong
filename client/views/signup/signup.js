signupErrors = new ReactiveVar();

Template.signup.rendered = function () {
  $('body').addClass('homeBody');
  signupErrors.set(null);
};

Template.signup.destroyed = function () {
  $('body').removeClass('homeBody');
};

Template.signup.helpers({
  errors: function () {
    return signupErrors.get();
  }
});

Template.signup.events({
  'submit [data-action=signup]': function (e) {
    e.preventDefault();
    var user = $(e.target).serializeObject();
    var errors = [];
    if(user.email == false){
      errors.push("Email can't be blank.");
    }
    if(user.email && !/\S+@\S+\.\S+/.test(user.email)){
      errors.push("Please enter valid email address.")
    }
    if(user.password == false){
      errors.push("Password can't be blank.");
    }
    if(user.password != user.passwordConfirmation){
      errors.push("Password confirmation doesn't match password.");
    }
    if(errors.length > 0){
      signupErrors.set(errors);
    }else{
      Accounts.createUser(user, function(err){
        if(err){
          signupErrors.set([err.reason]);
        }else{
          Router.go('project.list');
        }
      });
    }

  }
});
