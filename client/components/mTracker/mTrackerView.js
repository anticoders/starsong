Utils.midiTime = new ReactiveVar(0);

Template.mTrackerView.rendered = function() {
  var self = this;

  Utils.midiTime.set(0);

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

Template.mTrackerView.helpers({
  
  posW: function() {
    // console.log("PROJECT?", this);
    return Utils.music.timeToPx(this.length * Utils.music.second) + 40;
  },

  posMidi: function() {
    return Utils.music.timeToPx(Utils.midiTime.get()) + 20;
  },

  seconds: function() {
    var seconds = [];
    for(var i = 1; i < this.length; ++i) {
      seconds.push({
        label: i,
        posX: Utils.music.timeToPx(i * Utils.music.second),
      });
    }
    return seconds;
  },

});

Template.mTrackerView.events({

  'input [data-action=zoom]': function(e, t) {
    Utils.music.pxInSecond.set($(e.currentTarget).val());
  },

  'click [data-action=insert]': function(e, t) {
    
    if(e.target !== e.currentTarget) return;
    
    var self = this;

    AntiModals.overlay('newStemModal', {
      modal: true,
    }, function(err, res) {

      if(!res) return;

      var type = (res === 'MIDI') ? 'MIDI' : 'AUDIO';

      var x0 = Utils.music.pxToTime(e.offsetX - 20);

      // console.log("INSRT", {
      //   projectId:    self.projectId,
      //   trackId:      self._id,
      //   x0:           x0,
      //   x1:           x0 + 10 * Utils.music.second,
      //   type:         type,
      // });

      Stems.insert({
        projectId:    self.projectId,
        trackId:      self._id,
        x0:           x0,
        x1:           x0 + res.duration || x0 + 10 * Utils.music.second,
        type:         type,
        fileId:       res.id, 
      });
      
    });

  },

  'click [data-action=addtrack]': function(e, t) {
    Tracks.insert({
      projectId:    t.data.project._id,
      order:        t.data.project.tracks().count(),
      name:         'Track ' + t.data.project.tracks().count(),
    });
  },

  'click [data-action=play]': function(e, t) {
    // conso
    Utils.timelinePlayer.play();
    // removeMargins
  },
  'click [data-action=pause]': function(e, t) {
    // conso
    Utils.timelinePlayer.pause();
    // removeMargins
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

