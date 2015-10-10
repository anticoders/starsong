

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

