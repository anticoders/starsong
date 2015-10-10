WavesCollector = function(){
  var template = new Template('wavesCollector',Template.__custom_collector.renderFunction);
  template.s3Uploader = new S3uploader(); 
  
  template.events({
    'click [data-action="chooseFile"]' : function(e,t){
      t.$('input[type=file]').click(); 
    }, 
    'change input[type=file]' : function(e,t){

    }, 
  }); 

  template.helpers({

  }); 

  return template;  
}; 


Template.sandboxRecorder.helpers({
	'collector' : function(){
    return new WavesCollector(); 
  }
}); 