Template.landing.rendered = function() {
  $('body').addClass('landingBody');
};


Template.landing.destroyed = function() {
  $('body').removeClass('landingBody');
};

