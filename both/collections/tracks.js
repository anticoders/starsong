

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



_.extend(Track.prototype, {

  stems: function() {
    return Stems.find({
      trackId: this._id,
    }, {
      sort: {x0: 1},
    });
  },

});


/*

  projectId:        String / id in Projects
  order:            String

  lockedUserId:     UserId

*/



