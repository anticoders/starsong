


Template.mTrackerStemView.rendered = function() {
  var self = this;

  self.$('.mRightDrag').pep({
    axis:                 'x',
    place:                false,
    useCSSTranslation:    false,
    start: function(ev, obj) {
      var stem = obj.$el.closest('.mStem');
      stem.addClass('pepActive');
      stem.data('pepinitwidth', stem.width() - ev.screenX);
    },
    drag: function(ev, obj) {
      var stem = obj.$el.closest('.mStem');
      stem.css('width', stem.data('pepinitwidth') + ev.screenX + 'px');
    },
    stop: function(ev, obj) {
      var stem = obj.$el.closest('.mStem');
      stem.removeClass('pepActive');

      Stems.update(self.data._id, {$set: {
        x1: self.data.x0 + Utils.music.pxToTime(stem.width()),
      }});

      // obj.$el.css('translation', 'none');
    },
  });
};



Template.mTrackerStemView.helpers({

  posX0: function() {
    return Utils.music.timeToPx(this.x0);
  },

  posW: function() {
    return Utils.music.timeToPx(this.x1 - this.x0);
  },

});




Template.mTrackerStemView.events({

  'click [data-action=edit]': function() {
    console.log('EDIT');
  },

});


