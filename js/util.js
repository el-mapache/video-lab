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

  root.Utils.extend = extend;
}(window));
