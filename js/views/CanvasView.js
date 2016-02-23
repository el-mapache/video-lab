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

  //this.canvas.width = this.width * 2;
  //this.canvas.height = this.height * 2;

  this.backingVideo.style.width = this.canvas.style.width = (this.canvas.width + 'px');
  this.backingVideo.style.height = this.canvas.style.height = (this.canvas.height + 'px');

  this.initialize();
}

CanvasView.prototype.initialize = function() {
  document.getElementById("snapshot").addEventListener("click", this.takePhoto.bind(this));
  document.getElementById("feedback").addEventListener("click", this.toggleFeedback.bind(this));
  document.getElementById("canvasBlur").addEventListener("input", this.blur.bind(this));
  document.getElementById("h-scan").addEventListener("click", this.getHorizontalScanline.bind(this));

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

// CanvasView.prototype.drawFlow = function(direction) {
//   var ctx = this.canvasContext;
//   //ctx.clearRect(0, 0, this.width, this.height);
//   var zone = null;

//   while(zone = direction.zones.shift()) {
//     var distance = Math.pow(zone.x - (zone.x - zone.u),2) + Math.pow(zone.y - (zone.y + zone.v),2);

//     if (distance < 20) {
//       continue;
//     }

//     ctx.strokeStyle = getDirectionalColor(zone.u, zone.v);
//     ctx.beginPath();
//     ctx.moveTo(zone.x,zone.y);

//     ctx.lineTo((zone.x - zone.u), zone.y + zone.v);

//     //ctx.lineWidth = 2;
//     ctx.stroke();
//   }

//   return true;
// };

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

CanvasView.prototype.getHorizontalScanline = function(offset) {
  var imageData = this.getPixels();
  var data = imageData.data;

  var scanlineLength = this.width * 4;
  var targetHeight = this.height;


  for (var i = 0; i < targetHeight; i += 3) {
    var offset = scanlineLength * i;
    var scanlineEnd = scanlineLength + offset;

    for (var ii = offset; ii < scanlineEnd; ii += 4) {
      if ((ii + 4) > scanlineEnd) {
        break;
      }

      data[ii] = data[ii] - data[ii + 4];
      data[ii+1] = data[ii+1] - data[ii + 5];
      data[ii+2] = data[ii +2] - data[ii + 6];
    }
  }

  return imageData;
};

CanvasView.prototype.constructor = CanvasView;
