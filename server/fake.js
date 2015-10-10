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
    dscriptiom: 'Fake decsription',
    _label:     'FAKE',
    length:     30,
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

      x0 = x1 + (1 + Math.floor(Math.random() * 3 * 4)) * (Utils.music.second / 4);
      x1 = x0 + (2 + Math.floor(Math.random() * 5 * 4)) * (Utils.music.second / 4);

      Stems.insert({
        projectId:    pid,
        trackId:      tid,
        x0:           x0,
        x1:           x1,
        type:         (Math.random() > 0.1) ? 'MIDI' : 'AUDIO',
      });

    });
  });


});





