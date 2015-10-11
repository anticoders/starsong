

Template.mMidiNoteView.rendered = function() {
  var self = this;
  var noteOb = self.data;
  var stemOb = Template.closestData('stem').stem;

  self.$('.mRightDrag').pep({
    axis:                 'x',
    place:                false,
    useCSSTranslation:    false,
    start: function(ev, obj) {
      var note = obj.$el.closest('.mNote');
      note.addClass('pepActive');
      note.data('pepinitwidth', note.width() - ev.screenX);
    },
    drag: function(ev, obj) {
      var note = obj.$el.closest('.mNote');
      note.css('width', note.data('pepinitwidth') + ev.screenX + 'px');
    },
    stop: function(ev, obj) {
      var note = obj.$el.closest('.mNote');
      note.removeClass('pepActive');
      
      Stems.update(stemOb._id, {$set: _.object(
        ['midi.' + noteOb.idx + '.t1'],
        [Utils.music.pxToTime(note.left() + note.width() - 20)]
      )});

      obj.$el.css({
        'transition': 'none',
      });
    },
  });

  self.$('.mLeftDrag').pep({
    axis:                 'x',
    place:                false,
    useCSSTranslation:    false,
    cssEaseDuration:      0,
    start: function(ev, obj) {
      var note = obj.$el.closest('.mNote');
      note.addClass('pepActive');
      note.data('pepinitleft', note.left() - ev.screenX);
      note.data('pepinitwidth', note.width() + ev.screenX);

      note.find('.mRightDrag').css({
        'transition': 'none',
      });
    },
    drag: function(ev, obj) {
      var note = obj.$el.closest('.mNote');
      note.css({
        left: note.data('pepinitleft') + ev.screenX + 'px',
        width: note.data('pepinitwidth') - ev.screenX + 'px',
      });
      obj.$el.css({
        left: '-20px',
      });
      note.find('.mRightDrag').css({
        left: note.data('pepinitwidth') - ev.screenX + 'px',
      });
    },
    stop: function(ev, obj) {
      var note = obj.$el.closest('.mNote');
      note.removeClass('pepActive');

      Stems.update(stemOb._id, {$set: _.object(
        ['midi.' + noteOb.idx + '.t0'],
        [Utils.music.pxToTime(note.left() - 20)]
      )});
    },
    rest: function(ev, obj) {
      obj.$el.css({
        left: '-20px',
        // top:  '0px',
      });
    },
  });

  self.$('.mDrag').pep({
    // axis:                 'x',
    place:                false,
    useCSSTranslation:    false,
    droppable:            '.mTrack',
    start: function(ev, obj) {
      var note = obj.$el.closest('.mNote');
      note.addClass('pepActive');
      note.data('pepinitleft', note.left() - ev.screenX);
      note.data('pepinittop', note.top() - ev.screenY);
    },
    drag: function(ev, obj) {
      var note = obj.$el.closest('.mNote');
      note.css({
        left: note.data('pepinitleft') + ev.screenX + 'px',
        top: note.data('pepinittop') + ev.screenY + 'px',
      });
      obj.$el.css({
        left: '0px',
        top:  '0px',
      });
    },
    stop: function(ev, obj) {
      var note = obj.$el.closest('.mNote');
      note.removeClass('pepActive');

      var drop = this.activeDropRegions[0];

      if(!drop) {
        // Stems.update(stemOb._id, {$set: _.object(
        //   ['midi.' + noteOb.idx + '.delete'],
        //   [true]
        // )});
        Stems.update(stemOb._id, {$pull: {
          midi: {_id: noteOb._id},
        }});

        return;
      }

      Stems.update(stemOb._id, {$set: _.object(
        ['midi.' + noteOb.idx + '.t0',
         'midi.' + noteOb.idx + '.t1',
         'midi.' + noteOb.idx + '.n',
        ],
        [Utils.music.pxToTime(note.left() - 20),
         Utils.music.pxToTime(note.left() + note.width() - 20),
         drop.data('note'),
        ]
      )});


      $('.pep-dpa').removeClass('pep-dpa');
      note.css({
        top: '1px',
      });
    },
  });



};




Template.mMidiNoteView.helpers({

  posX0: function() {
    return Utils.music.timeToPx(this.t0 * Utils.music.milisecond) + 20;
  },

  posW: function() {
    return Utils.music.timeToPx((this.t1 - this.t0) * Utils.music.milisecond);
  },

});