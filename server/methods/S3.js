AWS = Meteor.npmRequire('aws-sdk');

Meteor.startup(function(){
  AWS.config.update({
    accessKeyId: "AKIAI7JBDH6XQMVJ5OEQ",
    secretAccessKey: "V3TVVR5kRSPBuGr3TI0fjFrQZ8ugqBdoOxfJ51uw/pXEo1oipt"
  });
});

Meteor.methods({

  generateSignedUrl : function(fileId){
    var s3Client = new AWS.S3();
    var params = {Bucket: "meteor-tracker", Key: fileId };
    var url = s3Client.getSignedUrl('putObject', params);
    return url;
  },

});
