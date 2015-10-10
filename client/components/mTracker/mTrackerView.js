Template.mTrackerView.rendered = function() {
  var self = this;

  this.autorun(function() {
    setBackground(self.$('.mScroll'));
  });
  
};

Template.mTrackerView.helpers({
  
  posW: function() {
    // console.log("PROJECT?", this);
    return Utils.music.timeToPx(this.length * Utils.music.second) + 40;
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
    // console.log("INSERT", e.offsetX);
    if(e.target !== e.currentTarget) return;
    
    var x0 = Utils.music.pxToTime(e.offsetX - 20);

    Stems.insert({
      projectId:    this.projectId,
      trackId:      this._id,
      x0:           x0,
      x1:           x0 + 10 * Utils.music.second,
      type:         'MIDI',
    });
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

