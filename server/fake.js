Meteor.startup(function() {

  if((!process.env.FAKE)) {
    console.log(Utils.term.RED + "NO FAKE HERE" + Utils.term.NONE);
    return;
  }

  Projects.remove({});
  Tracks.remove({});
  Stems.remove({});

  console.log(Utils.term.YELLOW + "FAKING A PROJECT" + Utils.term.NONE);


  var pid = Projects.insert({
    name:       'Fake project',
    _label:     'FAKE',
  });

  _.times(8, function(idx) {
    var tid = Tracks.insert({
      projectId:      pid,
      order:          idx,
      name:           'Track ' + idx,
    });

    var x0 = 0;
    var x1 = 0;

    _.times(3, function() {

      x0 = x1 + Math.floor(Math.random() * 5 * Utils.music.second);
      x1 = x0 + Math.floor(Math.random() * 6 * Utils.music.second);

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





