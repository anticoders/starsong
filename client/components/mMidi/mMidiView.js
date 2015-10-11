var pianoNotes = ['A', null, 'B', 'C', null, 'D', null, 'E', 'F', null, 'G', null];
var pianoKeys = [];



for(var i = 27; i < 52; ++i) {
  pianoKeys.splice(0, 0, {
    midiNote:   i,
    noteName:   pianoNotes[i % 12],
    octaveName: Math.floor( (i + 9) / 12),
    black:      !pianoNotes[i % 12],
  });
}


Template.mMidiView.rendered = function() {
  var self = this;

  this.autorun(function() {
    setBackground(self.$('.mScroll'));
  });
  
};


Template.mMidiView.helpers({

  posW: function() {
    return Utils.music.timeToPx(this.x1 - this.x0) + 40;
  },

  seconds: function() {
    var seconds = [];
    var length = (this.x1 - this.x0) / Utils.music.second;

    for(var i = 1; i < length; ++i) {
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
      // _id:  Random.id(),
      n:    self.midiNote,
      t0:   x0,
      t1:   x0 + Utils.music.second * 0.25,
      ch:   0,
      vol:  127,
      vel:  127,
    }}})
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

