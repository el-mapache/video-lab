var EmbossFilter = VL.Model.extend({
  defaults: {
    'name':        'emboss',
    'type':        'filter',
    'active':       false,
    'potential':    'fixed'
  },

  filter: function(imageData) {
    var width = imageData.width;
    var data = imageData.data;
    var length = data.length;
    var ii = -1;
    var MAGIC = 125;


    while (++ii < length) {
      if ((ii & 3) === 3) continue;

      data[ii] = MAGIC + (data[ii] << 1) - data[ii + 4] - data[ii + (width << 2)];
    }

    return imageData;
  }
});