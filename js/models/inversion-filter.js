import VL from 'lib/framework';

const InversionFilter = VL.Model.extend({
  defaults: {
    'name':        'invert',
    'type':        'filter',
    'active':       false,
    'potential':    'fixed'
  },

  init: function() {
  	this.lookup = [];
    this._buildLookup();
  },

  filter: function(imageData) {
    var data = imageData.data;
    var length = data.length;
    var ii = 0;

    while ((ii = ii + 4) < length) {
      data[ii] =     this.lookup[data[ii]];
      data[ii + 1] = this.lookup[data[ii + 1]];
      data[ii + 2] = this.lookup[data[ii + 2]];
    }

    return imageData;
  },

  _buildLookup: function() {
    for (var i = 0; i < 256; i++) {
      this.lookup[i] = 255 - i;
    }
  }
});

export default InversionFilter;
