// Meteor.startup(function() {

//   if((!process.env.FAKE)) {
//     console.log(Utils.term.RED + "NO FAKE HERE" + Utils.term.NONE);
//     return;
//   }

//   Projects.remove({});
//   Tracks.remove({});
//   Stems.remove({});

//   console.log(Utils.term.YELLOW + "FAKING A PROJECT" + Utils.term.NONE);


//   var pid = Projects.insert({
//     name:       'Fake project',
//     dscriptiom: 'Fake decsription',
//     _label:     'FAKE',
//     length:     30,
//   });

//   var tid;

//   _.times(8, function(idx) {
//     tid = Tracks.insert({
//       projectId:      pid,
//       order:          idx,
//       name:           'Track ' + idx,
//     });

//     var x0 = 0;
//     var x1 = 0;

//     _.times(3, function() {

//       x0 = x1 + (1 + Math.floor(Math.random() * 3 * 4)) * (Utils.music.second / 4);
//       x1 = x0 + (2 + Math.floor(Math.random() * 5 * 4)) * (Utils.music.second / 4);

//       Stems.insert({
//         projectId:    pid,
//         trackId:      tid,
//         x0:           x0,
//         x1:           x1,
//         type:         (Math.random() > 0.1) ? 'MIDI' : 'AUDIO',
//       });

//     });
//   });

//   Stems.insert({
//     projectId:    pid,
//     trackId:      tid,
//     x0:           0,
//     x1:           Utils.music.second,
//     type:         'MIDI',
//     _label:       'FAKE',
//     midi:         [
//       {idx: 'af0001', n: 48, t0: 1954, t1: 2896, ch: 0, vol: 127, vel: 127},
//       {idx: 'af0002', n: 49, t0: 2912, t1: 3563, ch: 0, vol: 127, vel: 127},
//       {idx: 'af0003', n: 50, t0: 3719, t1: 4454, ch: 0, vol: 127, vel: 127},
//       {idx: 'af0004', n: 51, t0: 4487, t1: 4598, ch: 0, vol: 127, vel: 127},
//       {idx: 'af0005', n: 52, t0: 5198, t1: 5710, ch: 0, vol: 127, vel: 127},
//       {idx: 'af0006', n: 53, t0: 5846, t1: 5933, ch: 0, vol: 127, vel: 127},
//       {idx: 'af0007', n: 54, t0: 6014, t1: 6509, ch: 0, vol: 127, vel: 127},
//       {idx: 'af0008', n: 55, t0: 6773, t1: 7061, ch: 0, vol: 127, vel: 127},
//       {idx: 'af0009', n: 56, t0: 7950, t1: 8653, ch: 0, vol: 127, vel: 127},
//       {idx: 'af0010', n: 57, t0: 8713, t1: 9308, ch: 0, vol: 127, vel: 127},
//     ],
//   });


// });





