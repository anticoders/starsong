Template.newStemModal.events({

  'click [data-action=cancel]': function(e, t) {
    AntiModals.dismissOverlay(e.currentTarget);
  },

  'click [data-action=select]': function(e, t) {
    AntiModals.dismissOverlay(e.currentTarget, null, $(e.currentTarget).data('value'));
  },

});
