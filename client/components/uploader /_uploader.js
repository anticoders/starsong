
S3uploader = function(settings){
  this.state    = new ReactiveVar(S3uploader.MODES.READY);
  this.progress = new ReactiveVar();  
  this.settings = settings || {};
  this.currentFile = {}; 
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
  getWavMetadata : function(file,callback){
    var self = this; 
    function getWaveDuration(url) {
      var req = new XMLHttpRequest();
      req.open('GET', url, true);
      req.responseType = 'arraybuffer';
      req.onload = function() {
        var ctx = new webkitAudioContext();
        ctx.decodeAudioData(req.response, function(buffer) {
          callback({duration : Math.round(buffer.duration*1000)}); 
        })
      };
      req.send();
    }
    var reader = new FileReader();
    reader.onload = function(){
      getWaveDuration(this.result); 
    }
    reader.readAsDataURL(file);
  }, 
  uploadToS3 : function(file,url) {
    var this_s3upload, xhr;
    this_s3upload = this;
    this_s3upload.progress.set(0); 
    this.currentFile = {}; 
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