import VL from 'lib/framework';

const SaturationFilter = VL.Model.extend({
  defaults: {
    'name':        'saturation',
    'type':        'filter',
    'active':       false,
    'potential':    'variable',
    'min':          -10.0,
    'max':          10.0,
    'step':         0.5,
    'currentValue': 1.0
  },

  filter: function(imageData) {
    var PR = 0.299;
    var PG = 0.587;
    var PB = 0.114;

    var change = this.get('currentValue');

    var data = imageData.data;
    var length = data.length;
    var r,g,b;
    var i = 0;

    for(i; i < length; i += 4) {
      r = data[i];
      g = data[i+1];
      b = data[i+2];

      var p = Math.sqrt( ((r*r) * PR) + ((g*g) * PG) + ((b*b) * PB) );

      data[i] =   p + (r-p) * change;
      data[i+1] = p + (g-p) * change;
      data[i+2] = p + (b-p) * change;
    }

    return imageData;
  }
});

export default SaturationFilter;
