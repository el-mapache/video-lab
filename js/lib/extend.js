export default function(destObj) {
  var args = [].slice.call(arguments, 1);

  if (!destObj) return;

  while (args.length !== 0) {
    var source = args.shift();
    for (var prop in source)  {
      if (source.hasOwnProperty(prop)) {
        destObj[prop] = source[prop];
      }
    }
  }

  return destObj;
};
