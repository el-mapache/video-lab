var PosterizeFilter = VL.Model.extend({
  defaults: {
    'name':        'posterize',
    'type':        'filter',
    'active':       false,
    'potential':    'variable',
    'min':          1,
    'max':          255,
    'step':         1,
    'currentValue': 100
  },

  filter: function(imageData) {
    var data = imageData.data;
    var length = data.length;
    var level = this.get('currentValue');
    var step = 255 / level;
    var ii = -4;

    while ((ii = ii + 4) < length) {
      data[ii] =   ((data[ii] / step) * level) | 0;
      data[ii+1] = ((data[ii+1] / step) * level) | 0;
      data[ii+2] = ((data[ii+2] / step) * level) | 0;
    }
    return data;
  }
});

// var PosterizeFilter = VL.Model.extend({
//   defaults: {
//     'name':        'posterize',
//     'type':        'filter',
//     'active':       false,
//     'potential':    'variable',
//     'min':          1,
//     'max':          255,
//     'step':         1,
//     'currentValue': 100
//   },
//
//   filter: function(imageData) {
//     var data = imageData.data;
//     var length = data.length;
//     var level = this.get('currentValue') || 1;
//     var step = 255 % 16;
//     var ii = -4;
//
//     while ((ii = ii + 4) < length) {
//       data[ii] =   ((data[ii] % 16) * level) | 0;
//       data[ii+1] = ((data[ii+1]% 16) * level) | 0;
//       data[ii+2] = ((data[ii+2] % 16) * level) | 0;
//     }
//     return data;
//   }
// });
