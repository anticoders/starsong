

S3File = function(doc) {
  'use strict';
  _.extend(this, doc);
};

S3Files = new Mongo.Collection('s3Files', {
  transform: function(doc) {
    'use strict';
    return new S3File(doc);
  },
});


_.extend(S3File.prototype, {
  fileUrl : function(){
    var settings = Meteor.settings; 
    return 'http://s3.amazonaws.com/' + Meteor.settings.bucketName+'/'+this._id; 
  }
});

S3Files.before.insert(function (userId, doc) {
  doc.createdAt  = Date.now();
  doc.uploadedBy = userId; 
  console.log("doc",doc); 
});



