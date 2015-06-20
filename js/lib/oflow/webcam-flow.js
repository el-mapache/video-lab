(function(root) {
  root.OFlow = root.OFlow || {};

  var calculatedCallbacks = [];
  var lastPixels = null;
  
  var WebCamFlow = function(zones) {
    this.calculator = new FlowCalculator(zones);
  };

  WebCamFlow.prototype = {
    calculate: function(pixels, width, height) {
      if (lastPixels && pixels) {
        var zones = this.calculator.calculate(lastPixels, pixels, width, height);
        calculatedCallbacks.forEach(function (callback) {
          callback(zones);
        });
      } 
      lastPixels = pixels;
    },

    onCalculated: function(callback) {
      calculatedCallbacks.push(callback);
    }
  };  

  root.OFlow.WebCamFlow = WebCamFlow;

  return root;
}(window));