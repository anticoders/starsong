'use strict';

Template.projectStem.onCreated(function() {
  this.keyboard = new Components.Keyboard({
    
  });
});

Template.projectStem.helpers({
  myKeyboard: function () {
    return Template.instance().keyboard;
  },
});

