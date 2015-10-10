'use strict';

Router.configure({
  templateNameConverter:          'camelCase',
  routeControllerNameConverter:   'upperCamelCase',
  notFoundTemplate:               'notFound',
  loadingTemplate:                'loading',
  layoutTemplate:                  'applicationLayout',
});

Router.map(function() {

  this.route('home',              {path: '/'});
  
  this.route('sandbox.midi',      {path: '/sandbox/midi'});
  this.route('sandbox.player',    {path: '/sandbox/player'});
  
  this.route('onboarding',       {path: '/onboarding'});

  this.route('project.timeline', {path: '/timeline/:_id'});

});





