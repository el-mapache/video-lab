/**
 * A high level interface to capture optical flow from the <video> tag.
 * The API is symmetrical to webcamFlow.js
 *
 * Usage example:
 *  var flow = new VideoFlow();
 * 
 *  // Every time when optical flow is calculated
 *  // call the passed in callback:
 *  flow.onCalculated(function (direction) {
 *      // direction is an object which describes current flow:
 *      // direction.u, direction.v {floats} general flow vector
 *      // direction.zones {Array} is a collection of flowZones. 
 *      //  Each flow zone describes optical flow direction inside of it.
 *  });
 */
(function(root) {
  root.OFlow = root.OFlow || {};

  var VideoFlow = function(zoneSize) {
    var calculatedCallbacks = [];
    var calculator = new FlowCalculator(zoneSize || 8);
    var lastPixels = null;

    // every request animation frame this takes an array of pixels
    this.calculate = function (pixels, width, height) {   
      if (lastPixels && pixels) {
        var zones = calculator.calculate(lastPixels, pixels, width, height);
        calculatedCallbacks.forEach(function (callback) {
          callback(zones);
        });
      } 
      lastPixels = pixels;
    };

    
    this.onCalculated = function (callback) {
      calculatedCallbacks.push(callback);
    };
  };

  root.OFlow.VideoFlow = VideoFlow;

  return root;
}(window));