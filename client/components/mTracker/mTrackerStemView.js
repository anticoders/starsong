


Template.mTrackerStemView.rendered = function() {
  var self = this;

  self.$('.mRightDrag').pep({
    axis:                 'x',
    place:                false,
    useCSSTranslation:    false,
    start: function(ev, obj) {
      var rect = obj.$el.closest('.mStem');
      rect.addClass('pepActive');
      rect.data('pepinitwidth', rect.width() - ev.screenX);
    },
    drag: function(ev, obj) {
      var rect = obj.$el.closest('.mStem');
      rect.css('width', rect.data('pepinitwidth') + ev.screenX + 'px');
    },
    stop: function(ev, obj) {
      var rect = obj.$el.closest('.mStem');
      rect.removeClass('pepActive');

      Stems.update(self.data._id, {$set: {
        x1: Utils.music.pxToTime(rect.left() + rect.width() - 20),
      }});

      // obj.$el.css('translation', 'none');
    },
  });



  self.$('.mLeftDrag').pep({
    // axis:                 'x',
    place:                false,
    useCSSTranslation:    false,
    droppable:            '.mTrack',
    cssEaseDuration:      0,
    start: function(ev, obj) {
      var rect = obj.$el.closest('.mStem');
      rect.addClass('pepActive');
      rect.data('pepinitleft', rect.left() - ev.screenX);
      rect.data('pepinittop', rect.top() - ev.screenY);
    },
    drag: function(ev, obj) {
      var rect = obj.$el.closest('.mStem');
      rect.css({
        left: rect.data('pepinitleft') + ev.screenX + 'px',
        top: rect.data('pepinittop') + ev.screenY + 'px',
      });
      obj.$el.css({
        left: '-20px',
        top:  '3px',
      });
    },
    stop: function(ev, obj) {
      var rect = obj.$el.closest('.mStem');
      rect.removeClass('pepActive');



      obj.$el.css({
        left: '-20px',
        top:  '3px',
      });

      var drop = this.activeDropRegions[0];

      if(!drop) {
        Stems.remove(self.data._id);
        return;
      }

      Stems.update(self.data._id, {$set: {
        x0: Utils.music.pxToTime(rect.left() - 20),
        x1: Utils.music.pxToTime(rect.left() + rect.width() - 20),
        trackId: drop.data('track'),
      }});

      //   // Stems.update(stemOb._id, {$set: _.object(
      //   //   ['midi.' + noteOb.idx + '.delete'],
      //   //   [true]
      //   // )});
      //   Stems.update(stemOb._id, {$pull: {
      //     midi: {_id: noteOb._id},
      //   }});

      //   return;
      // }

      // Stems.update(stemOb._id, {$set: _.object(
      //   ['midi.' + noteOb.idx + '.t0',
      //    'midi.' + noteOb.idx + '.t1',
      //    'midi.' + noteOb.idx + '.n',
      //   ],
      //   [Utils.music.pxToTime(note.left() - 20),
      //    Utils.music.pxToTime(note.left() + note.width() - 20),
      //    drop.data('note'),
      //   ]
      // )});


      // $('.pep-dpa').removeClass('pep-dpa');
      // note.css({
      //   top: '1px',
      // });
    },
    rest: function(ev, obj) {
      obj.$el.css({
        left: '-20px',
        // top:  '0px',
      });
    },
  });
};



Template.mTrackerStemView.helpers({

  posX0: function() {
    return Utils.music.timeToPx(this.x0) + 20;
  },

  posW: function() {
    return Utils.music.timeToPx(this.x1 - this.x0);
  },

});




// Template.mTrackerStemView.events({

//   'click [data-action=edit]': function() {

//   },

// });


