

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

      // console.log("UPDATE", _.object(
      //   ['midi.' + noteOb.idx + '.t1'],
      //   [noteOb.t0 + Utils.music.pxToTime(note.width())]
      // ));

      
      Stems.update(stemOb._id, {$set: _.object(
        ['midi.' + noteOb.idx + '.t1'],
        [Utils.music.pxToTime(note.left() + note.width() - 20)]
      )});
    },
  });

  self.$('.mLeftDrag').pep({
    axis:                 'x',
    place:                false,
    useCSSTranslation:    false,
    start: function(ev, obj) {
      var note = obj.$el.closest('.mNote');
      note.addClass('pepActive');
      note.data('pepinitleft', note.left() - ev.screenX);
      note.data('pepinitwidth', note.width() + ev.screenX);

      note.find('.mRightDrag').css({
        'transform': 'none',
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
      console.log(" -- delta!", noteOb.t0);

      Stems.update(stemOb._id, {$set: _.object(
        ['midi.' + noteOb.idx + '.t0',
         // 'midi.' + noteOb.idx + '.t1',
        ],
        [Utils.music.pxToTime(note.left() - 20),
         // noteOb.t1 - delta,
        ]
      )});

      // obj.$el.css('translation', 'none');
    },
  });

  self.$('.mDrag').pep({
    axis:                 'x',
    place:                false,
    useCSSTranslation:    false,
    start: function(ev, obj) {
      var note = obj.$el.closest('.mNote');
      note.addClass('pepActive');
      note.data('pepinitleft', note.left() - ev.screenX);

      note.find('.mLeftDrag').css({
        'transform': 'none',
      });
      note.find('.mRightDrag').css({
        'transform': 'none',
      });
    },
    drag: function(ev, obj) {
      var note = obj.$el.closest('.mNote');
      note.css({
        left: note.data('pepinitleft') + ev.screenX + 'px',
      });
      obj.$el.css({
        left: '0px',
      });
    },
    stop: function(ev, obj) {
      var note = obj.$el.closest('.mNote');
      note.removeClass('pepActive');


      Stems.update(stemOb._id, {$set: _.object(
        ['midi.' + noteOb.idx + '.t0',
         'midi.' + noteOb.idx + '.t1',
        ],
        [Utils.music.pxToTime(note.left() - 20),
         Utils.music.pxToTime(note.left() + note.width() - 20)
        ]
      )});

      // obj.$el.css('translation', 'none');
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