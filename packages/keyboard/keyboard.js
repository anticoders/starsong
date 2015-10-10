/*globals Keyboard: true*/
'use strict';

Keyboard = function () {
  var template = new Template('keyboard', Template.__custom_keyboard.renderFunction);
  
  template.helpers({
    keys: [
      1, 2, 3, 4, 5, 6, 7, 8
    ]
  });
  
  return template;
};
