var pianoNotes = ['C', null, 'D', null, 'E', 'F', null, 'G', null, 'A', null, 'B'];


var pianoKeys = _.map(_.range(72, 47, -1), function(i) {
  return {
    midiNote:   i,
    noteName:   pianoNotes[i % 12],
    octaveName: Math.floor( (i + 9) / 12) - 1,
    black:      !pianoNotes[i % 12],
  };
});




var recording = new ReactiveVar(false);


Template.mMidiView.rendered = function() {
  var self = this;

  Utils.midiTime.set(0);
  recording.set(false);

  this.autorun(function() {
    setBackground(self.$('.mScroll'));
  });

  
  self.$('.mMomentHandle').pep({
    axis:                 'x',
    place:                false,
    removeMargins:        false,
    useCSSTranslation:    false,
    stop: function(ev, obj) {
      Utils.midiTime.set( Utils.music.pxToTime(obj.$el.left() -20));
    },
  });

  this.autorun(function() {
    var time = Utils.midiTime.get();
    if(Utils.timelinePlayer) {
      if(!Utils.timelinePlayer.isPlaying())
        Utils.timelinePlayer.seek(time);
    }
  });
};

Template.mMidiView.onCreated(function() {

  var stemId = this.data.stem._id;


  this.notesListener = postal.subscribe({
    channel: 'notes',
    topic: '*',
    callback: function (data, envelope) {
      if (envelope.topic === 'start') {
        recording.set(true);
        return;
      }
      if (envelope.topic === 'stop') {
        if(!recording.get()) return;
        recording.set(false);
        Stems.update(stemId, {$push: { midi: {
          _id:  Random.id(),
          n:    data.note,
          t0:   Utils.midiTime.get(),
          t1:   Utils.midiTime.get() + Utils.music.second * 0.25,
          ch:   0,
          vol:  127,
          vel:  127,
        }},$inc : {
          x1 : Utils.music.second * 0.25, 
        }})


        Utils.midiTime.set( Utils.midiTime.get() + 0.25 * Utils.music.second );
      }

      // 
    },
  });

});

Template.mMidiView.destroyed = function() {
  this.notesListener.unsubscribe();
};


  //   this.notesListener = postal.subscribe({
  //     channel: 'notes',
  //     topic: '*',
  //     callback: function (data, envelope) {
  //       if (!isRecording) {
  //         return;
  //       }
  //       if (envelope.topic === 'start') {
  //         notes[data.note] = Date.now();
  //       } else if (envelope.topic === 'stop') {
  //         if (!notes[data.note]) {
  //           // strange ... this should not happen ...
  //         } else {
  //           timeline.push({
  //             note: data.note,
  //             startTime: notes[data.note] - recordingStartTime,
  //             stopTime: Date.now() - recordingStartTime,
  //           });
  //         }
  //       }
  //     }
  //   });
  // });





Template.mMidiView.helpers({

  posW: function() {
    return Utils.music.timeToPx(this.x1 - this.x0) + 40;
  },

  posMidi: function() {
    return Utils.music.timeToPx(Utils.midiTime.get()) + 20;
  },

  seconds: function() {
    var seconds = [];
    var length = (this.x1 - this.x0) / Utils.music.second;
    for(var i = 1; i < 1000; ++i) {
      seconds.push({
        label: i,
        posX: Utils.music.timeToPx(i * Utils.music.second),
      });
    }
    return seconds;
  },


  pianoKeys: function() {
    return pianoKeys;
  },

  notesInKey: function() {
    var stem = Template.closestData('stem');
    if(!stem) return [];
    stem = stem.stem;
    var self = this;

    return _.filter(stem.midi, function(note) {
      return note.n === self.midiNote;
    });
  },

});


Template.mMidiView.events({

  'input [data-action=zoom]': function(e, t) {
    Utils.music.pxInSecond.set($(e.currentTarget).val());
  },

  'click [data-action=addnote]': function(e, t) {
    if(e.target !== e.currentTarget) return;
    
    var x0 = Utils.music.pxToTime(e.offsetX - 20);

    var self = this;
    Stems.update(t.data.stem._id, {$push: { midi: {
      _id:  Random.id(),
      n:    self.midiNote,
      t0:   x0,
      t1:   x0 + Utils.music.second * 0.25,
      ch:   0,
      vol:  127,
      vel:  127,
    }}}); 
  },

});



var setBackground = function($div) {


  var w = Utils.music.timeToPx(Utils.music.second);
  var w16 = w/16;

  var canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = 1;
  var ctx = canvas.getContext('2d');


  for(var i = 1; i <= 16; ++i) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.064)';
    if(i % 4 === 0) ctx.fillStyle = 'rgba(255, 255, 255, 0.125)';
    if(i % 16 === 0) ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';

    ctx.fillRect(Math.floor(w16 * i) - 1, 0, 1, 1);
  };

  $div.css({
    'background-image': 'url(' + canvas.toDataURL("image/png") + ')',
  });

  delete canvas;


};

