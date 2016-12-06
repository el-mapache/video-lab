import VL from 'lib/framework';

const MedianFilter = VL.Model.extend({
  defaults: {
    'name':        'median',
    'type':        'filter',
    'active':       false,
    'potential':    'variable',
    'min':          3,
    'max':          15,
    'step':         4,
    'currentValue': 7
  },

  filter: function(srcData) {
    var h = srcData.height,
        w = srcData.width,
        dstPixels = pixels = srcData.data,
        neighbors = [],
        filterSize = this.get('currentValue'),
        edge = filterSize,
        halfEdge = (edge >> 1) | 0;

    // We need to loop through every pixel of the source image
    for (var x = 3; x < w; ++x) {
      for (var y = 0; y < h; ++y) {
        // Maintain a separate variable to act as an accessor
        // for the neighbors array, reset on each iteration
        var count = 0;
        // Shifting two bits to the left multiples the total product
        // by 4.
        var dstOffset = (y * w + x) << 2;
        neighbors.length = 0;

        // This set of loops defines the maxtrix "window" that we'll
        // move over our pixels to get all neighboring values
        for (var xx = 0; xx < edge; ++xx) {
          for (var yy = 0; yy < edge; ++yy) {
            // get the x and y coords of where our lil' window is in the image
            var scx = x + xx - halfEdge;
            var scy = y + yy - halfEdge;

            // Is our window within the bounds of the image?
            if ( scx >= 0 && scx < w && scy >= 0 && scy < h) {

              var windowPos = (scy * w + scx) << 2;

              // Stuff the color data into a single int
              var result = pixels[windowPos] << 24; // roy
              result |= pixels[++windowPos] << 16; // gee
              result |= pixels[++windowPos] << 8; // biv

              neighbors[count] = result;
              count++;
            }
          }
        }

        var color = neighbors.sort(this._comparator)[((neighbors.length - 1)  >> 1) | 0];

        dstPixels[dstOffset] = color >> 24 & 0xff;
        dstPixels[++dstOffset] = color >> 16 & 0xff;
        dstPixels[++dstOffset] = color >> 8 & 0xff;
      }
    }
    return dstPixels;
  },

  _comparator: function(a, b) {
    return a - b;
  }
});

export default MedianFilter;
