AWS = Meteor.npmRequire('aws-sdk');

Meteor.startup(function(){
  AWS.config.update(Meteor.settings.S3);
});

Meteor.methods({

  storeFile : function(data){
    var fileId = S3Files.insert(data); 
    var s3Client = new AWS.S3();
    var params = {
      Bucket: Meteor.settings.S3.bucketName, 
      Key: fileId, 
      Expires: 600, 
      ContentType: data.type || 'audio/wav',
      ACL: 'public-read',
    };
    var url = s3Client.getSignedUrl('putObject', params);
    return {
      url : url, 
      id  : fileId, 
      duration : data.duration,
    };
  },

});
