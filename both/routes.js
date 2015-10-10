'use strict';

Router.configure({
  templateNameConverter:                'camelCase',
  routeControllerNameConverter:         'upperCamelCase',
  notFoundTemplate:                     'notFound',
  loadingTemplate:                      'loading',
});

Router.map(function() {

  this.route('home',                    {path: '/'});
  this.route('landing',                 {path: '/landing'});

  this.route('onboarding'),             {path: '/onboarding'};

  this.route('project.timeline',        {path: '/timeline/:_id'});
  this.route('project.settings',        {path: '/settings/:_id'});
  this.route('project.creator',         {path: '/creator'});

  this.route('signin',                  {path: '/signin'}); 
  this.route('signup',                  {path: '/signup'}); 
  
  // sandbox 
  this.route('sandbox.midi',            {path: '/sandbox/midi'});
  this.route('sandbox.tracker',         {path: '/sandbox/tracker'});
  this.route('sandbox.player',          {path: '/sandbox/player'});
  this.route('sandbox.recorder',        {path: '/sandbox/recorder'}); 

});





