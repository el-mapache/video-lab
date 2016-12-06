import VL from 'lib/framework';

const Convolver = VL.Model.extend({
  constructor: VL.Model,
  /*
   * Generic convolving function.
   * @param{pixels} [object] Image data object pulled from the current canvas frame.
   * @param{weights} [UInt8ClampedArray] An empty
   * @param{opacity} [number] Set opacity for a given pixel, between 0-255.
  */
	convolve: function(pixels, opacity) {
    var weights = this.__matrix__;
    // This determines how many rows the kernal has
    var side = Math.round(Math.sqrt(weights.length));
    // offset based on kernal size
    var halfSide = Math.floor(side/2);
    var src = pixels.data;
    // source width
    var sw = pixels.width;
    // source height
    var sh = pixels.height;
    // pad output by the convolution matrix

    var output  = document.createElement("canvas").getContext("2d").createImageData(sw,sh);
    var data = output.data;

    var alphaFac = opacity ? 1 : 0;
    var y = 0;

    // go through the destination image pixels
    while ((++y) < sh) {
      var x = 0;
      while ((++x) < sw) {
        // alias for further manipulation
        var sy = y;
        var sx = x;

        var dstOff = (y*sw+x)*4;
        // calculate the weighed sum of the source image pixels that
        // fall under the convolution matrix
        var r = 0, g = 0, b = 0, a =0;

        // cy refers the the kernal row, the first row of the matrix
        for (var cy=0; cy<side; cy++) {
          //var cx = 0;
          //cy refers to each element within the kernal row
          for (var cx=0; cx<side; cx++) {

            var scy = sy + cy - halfSide;
            var scx = sx + cx - halfSide;

            // ignore out-of-bounds.  sloppy but easier.
            if (!(scy >= 0 && scy < sh && scx >= 0 && scx < sw)) {
              continue;
            }

            var srcOff = (scy*sw+scx)*4;

            var wt = weights[cy*side+cx];

            r += src[srcOff] * wt;
            g += src[++srcOff] * wt;
            b += src[++srcOff] * wt;
            a += src[++srcOff] * wt;
          }
        }
        data[dstOff] = r;
        data[++dstOff] = g;
        data[++dstOff] = b;
        data[++dstOff] = 255;
      }
    }

    return output;
  }
});

export default Convolver;
