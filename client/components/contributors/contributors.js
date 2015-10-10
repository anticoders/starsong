Template.contributors.rendered = function () {
  $('.ui.search').search({
    apiSettings: {
      url: '/users?email={query}'
    },
    fields: {
      results : 'users',
      title   : 'email',
      url     : '#'
    },
    minCharacters : 3
  });
};