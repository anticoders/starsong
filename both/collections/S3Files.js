S3Files = new Meteor.Collection('s3Files');

S3Files.before.insert(function (userId, doc) {
  doc.createdAt  = Date.now();
  doc.uploadedBy = userId; 
  console.log("doc",doc); 
});