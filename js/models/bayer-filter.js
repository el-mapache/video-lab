import VL from 'lib/framework';

const BayerFilter = VL.Model.extend({
  MATRIX:[3,7,4,6,1,9,2,8,5],
  defaults: {
    'name':        'bayer',
    'type':        'filter',
    'active':       false,
    'potential':    'fixed'
  },

  filter: function(imageData) {
    var w = imageData.width;
    var data = imageData.data;
    var length = data.length;

    var i = -4;

    while ((i = i + 4) < length) {
      var  ii = (i >> 2);
      var x = (ii % w);
      var y = ((ii - x) / w);
      // Scale our color value (0-765) in between 1 and 9
      /*
       * General scaling formula
       * initial_range := (min..max)
       * target_range := (a..b)
       * x := some value in the initial range
       *
       * ((b - a) * (x - min) / (max - min)) + 1
      */
      var pixVal = (((8 * (data[i]+data[i+1]+data[i+2])) / 765) | 0) + 1;

      data[i] = data[i + 1] = data[i + 2] = pixVal >= this.MATRIX[(y%3)*3+(x%3)] ? 255 : 0;
    }

    return data;
  }
});

export default BayerFilter;
