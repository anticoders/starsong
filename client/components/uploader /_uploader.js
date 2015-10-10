
S3uploader = function(settings){
  this.state    = new ReactiveVar(S3uploader.MODES.READY);
  this.progress = new ReactiveVar();  
  this.settings = settings || {};
  this.currentFileUrl = new ReactiveVar(null); 
};

S3uploader.MODES = {
  READY :    'READY',
  PROGRESS : 'PROGRESS',
  FINISHED : 'FINISHED',
};

_.extend(S3uploader.prototype,{
  onError : function(message){
    console.log(message); 
  }, 
  onStart : function(){
    console.log("start uploading"); 
  }, 
  createCORSRequest : function(method, url) {
    var xhr;
    xhr = new XMLHttpRequest();
    if (xhr.withCredentials !== null) {
      xhr.open(method, url, true);
    } else if (typeof XDomainRequest !== "undefined") {
      xhr = new XDomainRequest();
      xhr.open(method, url);
    } else {
      xhr = null;
    }
    return xhr;
  },
  uploadToS3 : function(file,url) {
    var this_s3upload, xhr;
    this_s3upload = this;
    this_s3upload.progress.set(0); 
    xhr = this.createCORSRequest('PUT', url);
    if (!xhr) {
      this.onError('CORS not supported');
    } else {
      this_s3upload.onStart();
      xhr.onload = function() {
        if (xhr.status === 200) {
          this_s3upload.state.set(S3uploader.MODES.FINISHED); 
          return this_s3upload.state.set(S3uploader.MODES.READY);
        } else {
          return this_s3upload.onError('Upload error: ' + xhr.status);
        }
      };
      xhr.onerror = function() {
        return this_s3upload.onError('XHR error.');
      };
      xhr.upload.onprogress = function(e) {
        this_s3upload.state.set(S3uploader.MODES.PROGRESS); 
        var percentLoaded;
        if (e.lengthComputable) {
          percentLoaded = Math.round((e.loaded / e.total) * 100);
          return this_s3upload.progress.set(percentLoaded); 
        }
      };
    }
    xhr.setRequestHeader('Content-Type', file.type);
    xhr.setRequestHeader('x-amz-acl', 'public-read');
    return xhr.send(file);
  },
});