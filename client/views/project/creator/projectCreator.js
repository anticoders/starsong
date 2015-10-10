Template.projectCreator.rendered = function () {
  $('.ui.search').search({
    apiSettings: {
      url: '/users?email={query}',
      onSuccess: function(res, element, xhr){
        console.log(res);
      }
    },
    fields: {
      results : 'users',
      title   : 'email',
      url     : '#'
    },
    minCharacters : 3
  });
};