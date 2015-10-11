Router.route('/users', function () {
  var req = this.request;
  var res = this.response;

  var email = req.query.email;

  var users = Meteor.users.find({'emails.address': new RegExp(email)}).fetch();

  users = users.map(function(user){
    return {
      _id: user._id, 
      email: user.emails[0].address
    };
  });

  res.end(JSON.stringify({users: users}));
}, {where: 'server'});