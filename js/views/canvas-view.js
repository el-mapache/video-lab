import VL from 'lib/framework';
import GlitchService from 'services/glitch';

function CanvasView(el, stream) {
  // Whether or not the view screen is receiving data.
  this.active = false;

  this.feedback = !!this.feedback;
  this.isGlitch = !!this.isGlitch;
  this.canvas = el;
  this.canvasContext = this.canvas.getContext('2d');
  this.stream = stream;
  this.backingVideo = document.createElement('video');
  

  this.width = this.canvas.width = this.canvas.offsetWidth * window.devicePixelRatio;
  this.height = this.canvas.height = this.canvas.offsetHeight * window.devicePixelRatio / 2;
  //this.canvasContext.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
  
  this.backingVideo.style.width = this.canvas.width / 2 + 'px';
  this.backingVideo.style.height = this.canvas.height / 2 + 'px';

  this.initialize();
}

CanvasView.prototype.initialize = function() {
  document.getElementById("snapshot").addEventListener("click", this.takePhoto.bind(this));
  document.getElementById("feedback").addEventListener("click", this.toggleFeedback.bind(this));
  document.getElementById("canvasBlur").addEventListener("input", this.blur.bind(this));
  document.getElementById('glitch').addEventListener('click', this.toggleGlitch.bind(this));


  this.backingVideo.addEventListener('loadeddata', function() {
    this.backingVideo.play();
    this.trigger('ON_VIDEO_LOAD');
  }.bind(this));

  this.backingVideo.srcObject = this.stream;
  this.active = true;

  VL.Events.prototype.attachTo(this);

  return this;
};

CanvasView.prototype.blur = function(event) {
  if (!this.isActive()) {
    return false;
  }

  var ctx = this.canvas.getContext("2d"),
      currentAlpha = ctx.globalAlpha;

  ctx.globalAlpha = +event.target.value;
};

CanvasView.prototype.toggleFeedback = function() {
  if (!this.isActive()) {
    return false;
  }

  this.feedback = !this.feedback;
};

CanvasView.prototype.getImageData = function() {
  return this.canvasContext.getImageData(0, 0, this.width, this.height);
};

CanvasView.prototype.getDataURL = function() {
  return this.canvas.toDataURL('image/jpeg');
};

// Get all the pixels on current canvas
CanvasView.prototype.getPixels = function() {
  if (!this.isActive()) {
    return null;
  }

  if (!this.feedback) {
    // draw the current frame of video from the in-memory video tag to the canvas
    this.canvasContext.drawImage(this.backingVideo, 0, 0);
  }

  // Get the pixel data we just wrote to the virtual canvas
  var data = this.getImageData();

  return data;
};

CanvasView.prototype.draw = function(imageData) {
  if (!this.isActive()) {
    return false;
  }

  var self = this;

  this.canvasContext.putImageData(imageData, 0, 0);

  if (this.isGlitch) {
    GlitchService.glitch(this.getDataURL(), function(img) {
      self.canvasContext.drawImage(img, 0, 0);
    });
  }

  return true;
};

CanvasView.prototype.isActive = function() {
  return this.active;
};

CanvasView.prototype.takePhoto = function(evt) {
  var anchor, click;

  anchor = document.createElement("a");
  anchor.href = this.canvas.toDataURL("image/png");
  anchor.download = "image"+ +new Date() + ".png";

  anchor.dispatchEvent(new MouseEvent('click'));
};


CanvasView.prototype.toggleGlitch = function() {
  this.isGlitch = !this.isGlitch;
};

CanvasView.prototype.constructor = CanvasView;


export default CanvasView;
