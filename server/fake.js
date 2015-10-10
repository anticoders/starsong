Meteor.startup(function() {

  if((!process.env.FAKE) || Projects.findOne({_label: 'FAKE'})) {
    console.log(Utils.Term.RED + "PROJECT ALREADY FAKED" + Utils.Term.NONE);
    return;
  }

  console.log(Utils.Term.YELLOW + "FAKING A PROJECT" + Utils.Term.NONE);


  var pid = Projects.insert({
    name:       'Fake project',
    _label:     'FAKE',
  });

  _.times(8, function(idx) {
    var tid = Tracks.insert({
      projectId:      pid,
      order:          idx,
    });

    var x0 = 0;
    var x1 = 0;

    _.times(3, function() {

      x0 = x1 + Math.floor(Math.random() * 5000);
      x1 = x0 + Math.floor(Math.random() * 5000);

      Stems.insert({
        projectId:    pid,
        trackId:      tid,
        x0:           x0,
        x1:           x1,
        type:         'MIDI',
      });

    });
  });


});





