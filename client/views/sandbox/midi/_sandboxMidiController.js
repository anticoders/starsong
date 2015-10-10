SandboxMidiController = RouteController.extend({

  waitOn: function() {
    return [
      Meteor.subscribe('projects.fake'),
    ];
  },

  data: function() {
    var data = {
      stem: Stems.findOne({_label: 'FAKE'}),
    };

    __data = data;
    return data;
  },

});


