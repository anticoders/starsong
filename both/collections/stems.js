

Stem = function(doc) {
  'use strict';
  _.extend(this, doc);
};

Stems = new Mongo.Collection('stems', {
  transform: function(doc) {
    'use strict';
    return new Stem(doc);
  },
});



/*

  trackId:        TrackId
  x0:             Number
  x1:             Number

  lockedUserId:   UserId
  type:           'MIDI' | 'AUDIO'
  audioFileId:    FileId



*/


