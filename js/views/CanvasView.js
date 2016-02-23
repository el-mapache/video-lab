function CanvasView(el, stream) {
  // Whether or not the view screen is receiving data.
  this.active = false;

  this.feedback = !!this.feedback;
  this.canvas = el;
  this.canvasContext = this.canvas.getContext('2d');
  this.stream = stream;
  this.backingVideo = document.createElement('video');

  this.height = this.canvas.height;
  this.width = this.canvas.width;

  this.backingVideo.style.width = this.canvas.style.width = (this.canvas.width + 'px');
  this.backingVideo.style.height = this.canvas.style.height = (this.canvas.height + 'px');

  this.initialize();
}

CanvasView.prototype.initialize = function() {
  document.getElementById("snapshot").addEventListener("click", this.takePhoto.bind(this));
  document.getElementById("feedback").addEventListener("click", this.toggleFeedback.bind(this));
  document.getElementById("canvasBlur").addEventListener("input", this.blur.bind(this));

  this.backingVideo.addEventListener('loadeddata', function() {
    this.backingVideo.play();
    this.trigger('ON_VIDEO_LOAD');
  }.bind(this));

  this.backingVideo.src = window.URL.createObjectURL(this.stream);
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

CanvasView.prototype.getPixels = function() {
  if (!this.isActive()) {
    return null;
  }

  if (!this.feedback) {
    this.canvasContext.drawImage(this.backingVideo, 0, 0);
  }

  var data = this.getImageData();

  return data;
};

CanvasView.prototype.draw = function(imageData) {
  if (!this.isActive()) {
    return false;
  }

  this.canvasContext.putImageData(imageData, 0, 0);

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

  click = document.createEvent("Event");
  click.initEvent("click", true, true);

  anchor.dispatchEvent(click);
};

CanvasView.prototype.constructor = CanvasView;
