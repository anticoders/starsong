Template.home.rendered = function() {
  $('body').addClass('homeBody');
};


Template.home.destroyed = function() {
  $('body').removeClass('homeBody');
};

