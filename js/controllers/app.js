import FilterCollectionView from 'views/filter-collection-view';
import CanvasView from 'views/canvas-view';
import RequestUserMedia from 'services/user-media';

function AppController(filterCollection) {
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
};

AppController.prototype = Object.assign({}, AppController.prototype, {
  initialize: function() {
    RequestUserMedia.getVideoStream(this.onAfterStreamRequest.bind(this));
  },

  onAfterStreamRequest: function(stream) {
    if (!stream) {
      return console.log('User denied access to their webcam.');
    }

    this.allowedAccessToCamera = true;

    this.canvasView = new CanvasView(document.querySelector('canvas'), stream);
    this.canvasView.on('ON_VIDEO_LOAD', this.startAnimationLoop.bind(this));
  },

  startAnimationLoop: function() {
    var self = this;

    (function animationCallback() {
      var transformedData = self.filtersView.process(self.canvasView.getPixels());
      var shouldKeepDrawing = self.canvasView.draw(transformedData);

       if (!shouldKeepDrawing) {
         window.cancelAnimationFrame(self.rfid);
         self.rfid = null;
         return;
       }
      //window.setTimeout(function() {
        self.rfid = window.requestAnimationFrame(animationCallback);
      //}, 20);
    }())
  }
});

export default AppController;
