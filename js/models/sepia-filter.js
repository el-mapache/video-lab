import VL from 'lib/framework';

const SepiaFilter = VL.Model.extend({
  defaults: {
    'name':        'sepia',
    'type':        'filter',
    'active':       false,
    'potential':    'fixed'
  },

  filter: function(imageData) {
    var data = imageData.data;
    var length = data.length;
    var ii = 0;

    while((ii = ii+4) < length) {
      var r = data[ii];
      var g = data[ii+1];
      var b = data[ii+2];

      data[ii] = ((r * 0.393) + (g * 0.769) + (b * 0.189))   | 0;
      data[ii+1] = ((r * 0.349) + (g * 0.686) + (b * 0.168)) | 0;
      data[ii+2] = ((r * 0.272) + (g * 0.534) + (b * 0.131)) | 0;
    }

    return imageData;
  }
});

export default SepiaFilter;
