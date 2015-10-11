
//TODO : add metadata editor 

WavesCollector = function(options){
  options = options || {}; 
  var template = new Template('wavesCollector',Template.__custom_collector.renderFunction);
  template.s3Uploader = new S3uploader(); 
  template.recorder   = new SoundRecorder(); 

  template.events({
    'click [data-action="chooseFile"]' : function(e,t){
      t.$('input[type=file]').click(); 
    }, 
    'change input[type=file]' : function(e,t){
      var waveFile = e.target.files[0]; 
      var wavData = {
        name : waveFile.name, 
        projectId : options.projectId, 
        type : wavFile.type, 
      }; 
      i
      template.s3Uploader.getWavMetadata(waveFile,function(metadata){
        _.extend(wavData,metadata); 
        Meteor.call('storeFile',wavData,function(err,res){
          template.file = res; 
          template.s3Uploader.uploadToS3(waveFile,res.url); 
        }); 
      }); 
    }, 
    'click [data-action=record]' : function(e,t){
      template.recorder.startRecording(); 
    }, 
    'click [data-action=stopRecording]' : function(e,t){
      template.recorder.stopRecording(); 
    }, 
    'click [data-action=save]' : function(e,t){
      template.recorder.getMetadata(function(meta){
        meta.name = t.$('[data-context=name]').val(); 
        template.s3Uploader.state.set(S3uploader.MODES.PROGRESS);
        Meteor.call('storeFile',meta,function(err,res){
          template.file = res; 
          template.s3Uploader.uploadToS3(
            template.recorder.currentData.get(),
            res.url
          ); 
          template.recorder.reset(); 
        }); 
      }); 
    }
  }); 

  template.helpers({
    'isReady' : function(){
      return template.s3Uploader.state.get() === S3uploader.MODES.READY; 
    }, 
    'isInProgress' : function(){
      return template.s3Uploader.state.get() === S3uploader.MODES.PROGRESS; 
    }, 
    'progress' : function(){
      return template.s3Uploader.progress.get(); 
    }, 
    isInRecordingMode : function(){
      return template.recorder.recording.get(); 
    },
    recordedWavBlobUrl : function(){
      return template.recorder.currentUrl.get(); 
    }
  }); 

  return template;  
}; 


Template.sandboxRecorder.helpers({
	'collector' : function(){
    return new WavesCollector(); 
  }
}); 
//fake for now 
SandboxRecorderController = RouteController.extend({

});
