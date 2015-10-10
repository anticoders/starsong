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


