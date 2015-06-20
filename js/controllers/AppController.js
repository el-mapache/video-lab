function AppController() {
  // sub view representing the canvas element
  this.canvasView = null;
  // subview representing the filter nodes
  this.filtersView = new FilterCollectionView({
    el: '.filters',
    collection: filterCollection
  });

  this.allowedAccessToCamera = false;

  // Pointer to the current animation frame handler
  this.rfid = null;
  this.initialize();
}

AppController.prototype.initialize = function() {
  Services.UserMedia.getVideoStream(this.onAfterStreamRequest.bind(this));
};

AppController.prototype.onAfterStreamRequest = function(stream) {
  if (!stream) {
    return console.log('User denied access to their webcam.');
  }

  this.allowedAccessToCamera = true;  
  this.canvasView = new CanvasView(document.querySelector('canvas'), stream);
  this.canvasView.on('ON_VIDEO_LOAD', this.startAnimationLoop.bind(this));
};

AppController.prototype.startAnimationLoop = function() {
  var self = this;

  function animationCallback() {
    var transformedData = self.filtersView.process(self.canvasView.getPixels()); 
    var shouldKeepDrawing = self.canvasView.draw(transformedData);
    
     if (!shouldKeepDrawing) {
       window.cancelAnimationFrame(self.rfid);
       self.rfid = null;
       return;
     }

     self.rfid = window.requestAnimationFrame(animationCallback);
  }
  
  this.rfid = window.requestAnimationFrame(animationCallback);
};
