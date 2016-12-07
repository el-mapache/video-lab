import VL from 'lib/framework';

const ThresholdFilter = VL.Model.extend({
  defaults: {
    'name':        'threshold',
    'type':        'filter',
    'active':       false,
    'potential':    'variable',
    'min':          -100,
    'max':          100,
    'step':         1,
    'currentValue': -70
  },

  filter: function(imageData) {
    var data = imageData.data;
    var length = data.length;
    var ii = -4;
    var r, g, b;

    var threshold = this.attributes.currentValue;
    if (!threshold) return;

    while ((ii = ii + 4) < length) {
      r = data[ii];
      g = data[ii+1];
      b = data[ii+2];

      var gray = ((3*r+4*g+b) >> 3);

      if (threshold < 0) {
        data[ii] = data[ii+1] = data[ii+2] = gray >= (~threshold+1) ? 0 : 255;
      } else {
        data[ii] = data[ii+1] = data[ii+2] = gray >= threshold ? 255 : 0;
      }
    }

    return imageData;
  }
});

export default ThresholdFilter;
