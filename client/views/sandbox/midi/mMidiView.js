var pianoNotes = ['A', null, 'B', 'C', null, 'D', null, 'E', 'F', null, 'G', null];
var pianoKeys = [];



for(var i = 0; i < 60; ++i) {
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

  pianoKeys: function() {
    return pianoKeys;
  },

  notesInKey: function() {
    // var stem = Template.closestData('thisIs')
    return [];
  },

});


Template.mMidiView.events({

  'input [data-action=zoom]': function(e, t) {
    Utils.music.pxInSecond.set($(e.currentTarget).val());
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

