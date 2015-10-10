
Uploader = function(){
  var template = new Template('uploader',Template('__custom_uploader').renderFunction);
  template.s3Uploader = new S3uploader(); 
  return template;  
}
