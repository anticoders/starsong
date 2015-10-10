
Template.trackViewStem.rendered = function() {
  this.$('.mRightDrag .pep').pep({
    axis: 'x',
    start: function(ev, obj) {
      var stem = obj.$el.closest('.mStem');
      stem.data('pepinitwidth', stem.width() - ev.screenX);
    },
    drag: function(ev, obj) {
      // console.log("ev.", ev);
      // console.log("---", stem.data('pepinitwidth'), ev.offsetX, ev.pageX, ev.screenX);
      var stem = obj.$el.closest('.mStem');
      stem.css('width', stem.data('pepinitwidth') + ev.screenX + 'px');
    },
    stop: function(ev, obj) {
      // console.log("STOP", obj);
    },
  });
};



Template.trackViewStem.helpers({

  posX0: function() {
    return Math.floor(this.x0 * 100 / Utils.music.second);
  },

  posW: function() {
    return Math.floor((this.x1 - this.x0) * 100 / Utils.music.second);
  },

});




Template.trackViewStem.events({

  'click [data-action=edit]': function() {
    console.log('EDIT');
  },

});


