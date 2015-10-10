WavesCollector = function(options){
  options = options || {}; 
  var template = new Template('wavesCollector',Template.__custom_collector.renderFunction);
  template.s3Uploader = new S3uploader(); 
  
  template.events({
    'click [data-action="chooseFile"]' : function(e,t){
      t.$('input[type=file]').click(); 
    }, 
    'change input[type=file]' : function(e,t){
      var waveFile = e.target.files[0]; 
      var wavData = {
        name : waveFile.name, 
        projectId : options.projectId, 
      }; 
      template.s3Uploader.getWavMetadata(waveFile,function(metadata){
        _.extend(wavData,metadata); 
        Meteor.call('storeFile',wavData,function(err,res){
          template.s3Uploader.uploadToS3(waveFile,res.url); 
        }); 
      }); 
    }, 
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
