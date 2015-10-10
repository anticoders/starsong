

Track = function(doc) {
  'use strict';
  _.extend(this, doc);
};

Tracks = new Mongo.Collection('tracks', {
  transform: function(doc) {
    'use strict';
    return new Track(doc);
  },
});

