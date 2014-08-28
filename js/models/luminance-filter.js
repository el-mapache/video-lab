var Luminance = VL.Model.extend({
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
    return 0.299 * r + 0.587 * g + 0.114 * b;
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

      data[ii]   = r * ratio;
      data[ii+1] = g * ratio;
      data[ii+2] = b * ratio;
    }

    return data;
  }
});