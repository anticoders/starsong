Router.configure({
  templateNameConverter:          'camelCase',
  routeControllerNameConverter:   'upperCamelCase',
  notFoundTemplate:               'notFound',
  loadingTemplate:                'loading',
});

Router.map(function() {

  this.route('home',              {path: '/'});
  this.route('sandbox.midi',      {path: '/sandbox/midi'});
  this.route('onboarding'),       {path: '/onboarding'};



});





