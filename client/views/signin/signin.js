'use strict';

var signinErrors = new ReactiveVar();

Template.signin.rendered = function () {
  signinErrors.set(null);
};

Template.signin.helpers({
  errors: function () {
    return signinErrors.get();
  }
});

Template.signin.events({
  'submit [data-action=signin]': function (e) {
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
    if(errors.length > 0){
      signinErrors.set(errors);
    }else{
      Meteor.loginWithPassword(user.email, user.password, function(err){
        if(err){
          signinErrors.set([err.reason]);
        }else{
          Router.go('project.list');
        }
      });
    }

  }
});
