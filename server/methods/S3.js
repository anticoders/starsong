AWS = Meteor.npmRequire('aws-sdk');

Meteor.startup(function(){
  AWS.config.update({
    accessKeyId: "AKIAI7JBDH6XQMVJ5OEQ", 
    secretAccessKey: "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", 
    region: "us-west-2"
  });
});

Meteor.methods({

  storeFile : function(data){
    var fileId = S3Files.insert(data); 
    var s3Client = new AWS.S3();
    var params = {
      Bucket: "meteor-tracker", 
      Key: fileId, 
      Expires: 600000, 
      ContentType: 'audio/wav',
      ACL: 'public-read',
    };
    var url = s3Client.getSignedUrl('putObject', params);
    return {
      url : url, 
      id  : fileId, 
    };
  },

});
