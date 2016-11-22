  function nearestNeighbor(pixels, x, y, offset, width) {
    return pixels[offset + Math.round(y) * width * 4 + Math.round(x) * 4];
  }

  function nearestNeighborUnrolled(pixels, x, y, width) {
    var yw4x4 = ((y + 0.5) ^ 0) * width * 4 + ((x + 0.5) ^ 0) * 4;
    return [
      pixels[yw4x4],
      pixels[yw4x4 + 1],
      pixels[yw4x4 + 2]
    ]
  }
(function(root) {
  root.Utils = {};

  var extend = function(dest) {
    var args = [].slice.call(arguments, 1);

    if (!dest) return;

    while (args.length != 0) {
      var source = args.shift();
      for (var prop in source)  {
        dest[prop] = source[prop];
      }
    }

    return dest;
  };

  var forEach = function(list, callback) {
    var ii = -1;
    var length = list.length;

    while (++ii < length) {
      callback(list[ii], ii, list);
    }
  };

  root.Utils.extend = extend;
  root.Utils.forEach = forEach;
}(window))


  /*
   * Insanely basic function to allow the programmer to choose
   * between using setInterval or webkitRequestAnimationFrame.
   * Calling this function will overwrite the request and cancel methods
   * to setInterval and clearInterval. This isn't a polyfill and I have no
   * use for the time parameters passed back by requestAnimationFrame
   * so I'm leaving it out at this point.  Assumes the browser being used
   * is a recentish version of Chrome.
   *
   * @param {interval} Integer The number of milliseconds to wait before
   *                   executing the callback
   */
  function setAnimationType(interval) {
   if (typeof interval !== "undefined") {

     window.requestAnimationFrame = (function(interval) {
       // cache the requested interval
       var interval = interval;

       // return an anonymous function and execute the timeout
       return function(callback) {
         return window.setInterval(callback, interval);
       };

      })(interval);
    };

    window.cancelAnimationFrame = function(id) {
      clearInterval(id);
    };
  }
