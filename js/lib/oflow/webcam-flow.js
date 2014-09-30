/**
 * A high level interface to capture optical flow from the web camera.
 * @param defaultVideoTag {DOMElement} optional reference to <video> tag
 *   where web camera output should be rendered. If parameter is not
 *   present a new invisible <video> tag is created.
 * @param zoneSize {int} optional size of a flow zone in pixels. 8 by default
 *
 * Usage example:
 *  var flow = new WebCamFlow();
 * 
 *  // Every time when optical flow is calculated
 *  // call the passed in callback:
 *  flow.onCalculated(function (direction) {
 *      // direction is an object which describes current flow:
 *      // direction.u, direction.v {floats} general flow vector
 *      // direction.zones {Array} is a collection of flowZones. 
 *      //  Each flow zone describes optical flow direction inside of it.
 *  });
 *  // Starts capturing the flow from webcamer:
 *  flow.startCapture();
 *  // once you are done capturing call
 *  flow.stopCapture();
**/

(function(root) {
  root.OFlow = root.OFlow || {};
  var calculatedCallbacks = [];

  var gotFlow = function(direction) {
    calculatedCallbacks.forEach(function(callback) {
      callback(direction);
    });
  };
  
  var WebCamFlow = function(videoFlow) {
    this.videoFlow = videoFlow;
    this.videoFlow.onCalculated(gotFlow);
  }

  WebCamFlow.prototype = {
    // Pass thru tovideo flow object
    calculate: function(pixels, width, height) {
      this.videoFlow.calculate(pixels, width, height);
    },

    onCalculated: function(callback) {
      calculatedCallbacks.push(callback);
    }
  };  

  root.OFlow.WebCamFlow = WebCamFlow;

  return root;
}(window));