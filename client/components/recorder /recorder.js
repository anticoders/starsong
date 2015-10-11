window.URL = window.URL || window.webkitURL;
navigator.getUserMedia = navigator.getUserMedia ||
navigator.webkitGetUserMedia ||
navigator.mozGetUserMedia ||
navigator.msGetUserMedia;

var Recorder = function(source, cfg){
  var WORKER_PATH = "/recordingWorker.js"; 
  var config = cfg || {};
  var bufferLen = config.bufferLen || 4096;
  var numChannels = config.numChannels || 2;
  this.context = source.context;
  this.node = (this.context.createScriptProcessor ||
               this.context.createJavaScriptNode).call(this.context,
               bufferLen, numChannels, numChannels);
  var worker = new Worker(config.workerPath || WORKER_PATH);
  worker.postMessage({
    command: 'init',
    config: {
      sampleRate: this.context.sampleRate,
      numChannels: numChannels
    }
  });
  var recording = false,
    currCallback;

  this.node.onaudioprocess = function(e){
    if (!recording) return;
    var buffer = [];
    for (var channel = 0; channel < numChannels; channel++){
        buffer.push(e.inputBuffer.getChannelData(channel));
    }
    worker.postMessage({
      command: 'record',
      buffer: buffer
    });
  }

  this.configure = function(cfg){
    for (var prop in cfg){
      if (cfg.hasOwnProperty(prop)){
        config[prop] = cfg[prop];
      }
    }
  }

  this.record = function(){
    recording = true;
  }

  this.stop = function(){
    recording = false;
  }

  this.clear = function(){
    worker.postMessage({ command: 'clear' });
  }

  this.getBuffer = function(cb) {
    currCallback = cb || config.callback;
    worker.postMessage({ command: 'getBuffer' })
  }

  this.exportWAV = function(cb, type){
    currCallback = cb || config.callback;
    type = type || config.type || 'audio/wav';
    if (!currCallback) throw new Error('Callback not set');
    var w = worker.postMessage({
      command: 'exportWAV',
      type: type
    });
  }

  worker.onmessage = function(e){
    var blob = e.data;
    currCallback(blob);
  }

  source.connect(this.node);
  this.node.connect(this.context.destination);    //this should not be necessary

};

Recorder.forceDownload = function(blob, filename){
  var url = (window.URL || window.webkitURL).createObjectURL(blob);
  var link = window.document.createElement('a');
  link.href = url;
  link.download = filename || 'output.wav';
  var click = document.createEvent("Event");
  click.initEvent("click", true, true);
  link.dispatchEvent(click);
}

SoundRecorder = function(){
  this.recording    = new ReactiveVar(false);  
  this.currentUrl   = new ReactiveVar(); 
  this.currentData  = new ReactiveVar(); 
}; 

_.extend(SoundRecorder.prototype,{
  startRecording : function(){
    var self = this; 
    self.recording.set(true); 
    var audioContext = window.AudioContext || 
    window.AudioContext || 
    window.mozAudioContext;
    var context = new audioContext();
    navigator.getUserMedia({audio : true }, function (stream) {
      var streamSource = context.createMediaStreamSource(stream);
      self.recorder = new Recorder(
        streamSource,
        {
          callback : function(blob){
            self.url = window.URL.createObjectURL(blob); 
            self.currentData.set(blob); 
            self.currentUrl.set(window.URL.createObjectURL(blob)); 

          }
        }
      ); 
      self.recorder.record()

    },function(){
      console.log("no access to mickrophone"); 
    });
  }, 
  stopRecording : function(){
    this.recording.set(false) ; 
    this.recorder.stop(); 
    this.recorder.exportWAV(); 

  }, 
  reset : function(){
    this.currentData.set(null); 
    this.currentUrl.set(null); 
  }, 
  getMetadata : function(callback){
    var req = new XMLHttpRequest();
    req.open('GET', this.currentUrl.get(), true);
    req.responseType = 'arraybuffer';
    req.onload = function() {
      var ctx = new AudioContext();
      ctx.decodeAudioData(req.response, function(buffer) {
        callback({duration : Math.round(buffer.duration*1000)}); 
      })
    };
    req.send();
  }
}); 





