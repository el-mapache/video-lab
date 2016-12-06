onmessage = function(message) {
  var url = message.data.url;
  importScripts(url);

  // var imageData = message.data.data;
  // var filters = message.data.filters;
  //
  // var processedData = filters.reduce(function(nextImageData, filter) {
  //   return filter.call(nextImageData);
  // }, imageData);
  //
  // self.postMessage({ data: processedData });
};
