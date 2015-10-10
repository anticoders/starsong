window.URL = window.URL || window.webkitURL;
navigator.getUserMedia = navigator.getUserMedia ||
navigator.webkitGetUserMedia ||
navigator.mozGetUserMedia ||
navigator.msGetUserMedia;

SoundRecorder  = function(){
  this.recording = false; 
  this.currentData = []; 
}

_.extend(SoundRecorder.prototype,{
  startRecording : function(){
    var self = this; 
    self.recording = true; 
    var audioContext = window.AudioContext || 
    window.webkitAudioContext || 
    window.mozAudioContext;
    var context = new audioContext();
    navigator.getUserMedia({audio : true, video : false}, function (stream) {
      var streamSource = context.createMediaStreamSource(stream);
      var recorder = context.createScriptProcessor(4096, 1, 1);
      recorder.onaudioprocess = function(e){
        if(!self.recording) return ; 
        var data = e.inputBuffer.getChannelData(0);
        self.currentData.push(data); 
      }
      streamSource.connect(recorder);
      recorder.connect(context.destination);
    },function(){
      console.log("no access to mickrophones"); 
    });
  }, 
  stopRecording : function(){
    this.recording = false ; 
  }
}); 