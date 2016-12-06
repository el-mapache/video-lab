import VL from 'lib/framework';

const GrayscaleFilter = VL.Model.extend({
  defaults: {
    'name':      'grayscale',
    'type':      'filter',
    'active':    false,
    'potential': 'fixed'
  },

  filter: function(imageData) {
    // Uses luminosity to compute gray.
    var l = imageData.data.length,
        data = imageData.data,
        i = 0,
        r,g,b;

    for (i; i < l; i += 4) {
      r = data[i];
      g = data[i+1];
      b = data[i+2];

      data[i] = data[i+1] = data[i+2] = (0.21 * r + 0.72 * g + 0.07 * b);
    }

    return data;
  }
});

export default GrayscaleFilter;
