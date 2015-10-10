Helpers.registerAs('$');

Helpers.define('asset', function (path) {
    return Meteor.absoluteUrl() + 'assets' + path;
});
