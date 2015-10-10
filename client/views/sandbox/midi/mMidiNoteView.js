Template.mMidiNoteView.helpers({

  posX0: function() {
    return Utils.music.timeToPx(this.t0 * Utils.music.milisecond) + 20;
  },

  posW: function() {
    return Utils.music.timeToPx((this.t1 - this.t0) * Utils.music.milisecond);
  },

});