Template.newStemModal.events({

  'click [data-action=cancel]': function(e, t) {
    AntiModals.dismissOverlay(e.currentTarget);
  },

  'click [data-action=select]': function(e, t) {
    AntiModals.dismissOverlay(
    	e.currentTarget, null, 
    	$(e.currentTarget).data('value'));
  },

});

Template.newStemModal.onCreated(function(){
  var self = this; 
  self.collector = new WavesCollector(); 
  self.autorun(function(){
    var state = self.collector.s3Uploader.state.get(); 
    if(state === S3uploader.MODES.FINISHED){
      AntiModals.dismissAll(null, self.collector.file);
    }
  }); 
}); 

Template.newStemModal.helpers({
  'wavesCollector' : function(){
    return Template.instance().collector; 
  }
}); 