
S3uploader = function(settings){
  this.state    = new ReactiveVar(S3uploader.MODES.READY);
  this.progress = new ReactiveVar() 
  this.settings = settings || {};
};

S3uploader.MODES = {
  READY :    'READY',
  PROGRESS : 'PROGRESS',
  FINISHED : 'FINISHED',
};

_.extend(S3uploader.prototype,{
  onError : function(err){
    this.state.set(S3uploader.MODES.ERROR);
  },
  onStart : function(){
    if(this.settings.onStart){
      this.settings.onStart();
    }
  },
  onProgress : function(progress,no,code){
    if(code === 200){
      this.progressArray[no].loaded.set(true);
    }
  },
  onFinish : function(){
    if(this.settings && this.settings.onUpload){
      this.settings.onUpload(null,{fileUrl: this.fileUrl.curValue, fileId: this.fileId.curValue});
    }
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
  uploadToS3 : function(file,url,no) {
    var this_s3upload, xhr;
    this_s3upload = this;
    xhr = this.createCORSRequest('PUT', url);
    if (!xhr) {
      this.onError('CORS not supported');
    } else {
      this_s3upload.onStart();
      xhr.onload = function() {
        if (xhr.status === 200) {
          this_s3upload.onProgress(100,no, 200);
          return this_s3upload.onFinish();
        } else {
          return this_s3upload.onError('Upload error: ' + xhr.status);
        }
      };
      xhr.onerror = function() {
        return this_s3upload.onError('XHR error.');
      };
      xhr.upload.onprogress = function(e) {
        var percentLoaded;
        if (e.lengthComputable) {
          percentLoaded = Math.round((e.loaded / e.total) * 100);
          return this_s3upload.onProgress(percentLoaded,no, percentLoaded === 100 ? 'Finalizing.' : 'Uploading.');
        }
      };
    }
    xhr.setRequestHeader('Content-Type', file.type);
    xhr.setRequestHeader('x-amz-acl', 'public-read');
    return xhr.send(file);
  },
});