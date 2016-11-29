import { Model } from './framework';

const LuminanceFilter = Model.extend({
  defaults: {
    'name':        'luminance',
    'type':        'filter',
    'active':       false,
    'potential':    'variable',
    'min':          0,
    'max':          100,
    'step':         1,
    'currentValue': 40
  },

  init: function() {},

  _sourceLuminance: function(r,g,b) {
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  },

  filter: function(imageData) {
    var data = imageData.data;
    var length = data.length;
    var ii = 0;

    for (ii; ii < length; ii += 4) {
      var r = data[ii],
          g = data[ii+1],
          b = data[ii+2];

      var ratio = this.get('currentValue') / this._sourceLuminance(r,g,b);

      var rr = (r * ratio | 0);
      var gg = (g * ratio | 0);
      var bb = (b * ratio | 0);

      data[ii]   = rr;
      data[ii+1] = gg;
      data[ii+2] = bb;
    }

    return data;
  }
});

export default LuminanceFilter;
