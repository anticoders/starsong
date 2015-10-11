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

  this.route('project.list',         {path: '/projects'});
  this.route('project.creator',         {path: '/project/creator'});
  this.route('project.timeline',        {path: '/project/:projectId'});
  this.route('project.stem',            {path: '/project/:projectId/stem/:stemId'});
  this.route('project.settings',        {path: '/project/:projectId/settings'});
  this.route('project.invite',          {path: '/project/:projectId/invite'});

  this.route('signin',                  {path: '/signin'}); 
  this.route('signup',                  {path: '/signup'}); 
  
  // sandbox 
  this.route('sandbox.midi',            {path: '/sandbox/midi'});
  this.route('sandbox.tracker',         {path: '/sandbox/tracker'});
  this.route('sandbox.player',          {path: '/sandbox/player'});
  this.route('sandbox.recorder',        {path: '/sandbox/recorder'}); 

});





