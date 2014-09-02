var LowResFilter = VL.Model.extend({
  RGB: [
    [0,0,0],    
    [0,0,170],  
    [0,170,0],
    [0,170,170],
    [170,0,0],
    [170,0,170],
    [170,85,0],
    [170,170,170],
    [85.85,85],
    [85,85,255],
    [85,255,85],
    [85,255,255],
    [255,85,85],
    [255,85,255],
    [255,255,85],
    [255,255,255]
  ],
  
  RGB_LENGTH: 16,

  defaults: {
    'name':        'low-res',
    'type':        'filter',
    'active':       false,
    'potential':    'fixed'
  },

  filter: function(imageData) {
    var data = imageData.data;
    var length = data.length;
    var rgbLength = this.RGB_LENGTH
    var ii = -4;
    var RGB = this.RGB;

    function clamp(r,g,b) {
      var i = 0;
      var color = RGB[0];


      var next;
      var clampIdx = 0;

      if (r == color[0] && g == color[1] && b == color[2]) return color;

      var x = r - color[0];
      var y = g - color[1];
      var z = b - color[2];

      var distance = x*x + y*y + z*z;


      while (++i < rgbLength) {
        color = RGB[i];

        var x = r - color[0];
        var y = g - color[1];
        var z = b - color[2];

        var next = x*x + y*y + z*z;

        if (next < distance) {
          distance = next;
          clampIdx = i;
        }
      }

      return RGB[clampIdx];
    }

    var clamped;

    while ((ii = ii + 4) < length) {
      clamped = clamp(data[ii], data[ii+2], data[ii+2]);
      
      data[ii] = clamped[0];
      data[ii+1] = clamped[1];
      data[ii+2] = clamped[2];
    }

    return data;
  },
});