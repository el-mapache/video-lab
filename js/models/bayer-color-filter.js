var BayerColorFilter = VL.Model.extend({
  BAYER_COLOR: {
    0: [0,0,0],
    1: [255,0,0],
    2: [0,255,0],
    3: [0,0,255],
    4: [255,255,0],
    5: [255,0,255],
    6: [0,255,255],
    7: [100,100,100],
    8: [255,255,255],
    9: [255,255,255]
  },

  defaults: {
    name: 'bayer color',
    type: 'filter',
    active: false,
    potential: 'fixed
  },

  filter: function(imageData) {
    var i = 0;
    var w = imageData.width;
    var data = imageData.data;
    var length = data.length;

    while ((i = i + 12) < length) {
      var pixVal = (((8 * (data[i]+data[i+1]+data[i+2])) / 765) | 0) + 1;
      var newcolor = this.BAYER_COLOR[pixVal];
      
      data[i]   = newcolor[0];
      data[i+1] = newcolor[1];
      data[i+2] = newcolor[2];
    }

    return data;
  }
});

