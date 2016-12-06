import VL from 'lib/framework';

const ContrastFilter = VL.Model.extend({
  defaults: {
    'name':        'contrast',
    'type':        'filter',
    'active':       false,
    'potential':    'variable',
    'max':          100,
    'min':          -100,
    'step':         1,
    'currentValue': 24
  },

  init: function() {
    this.lookup = [];
    this._buildLookup(this.get('currentValue'));

    this.on('model.change.currentValue', this._onCurrentValueChange);
  },

  filter: function(imageData) {
    var data = imageData.data;
    var length = data.length;

    var r,g,b;
    var ii = 0;

    for (ii; ii < length; ii = ii + 4) {
      data[ii] =   this.lookup[data[ii]];
      data[ii+1] = this.lookup[data[ii+1]];
      data[ii+2] = this.lookup[data[ii+2]];
    }

    return data;
  },

  _buildLookup: function(value) {
    var contrast = (100.0 + value) / 100.0;
    contrast *= contrast;

    var output;

    for (var ii = 0; ii < 256; ii++) {
      output = ii;
      output = output / 255.0;
      output -= 0.5;
      output *= contrast;
      output += 0.5;
      output *= 255;

      if (output < 0) {
        output = 0;
      }

      if (output > 255) {
        output = 255;
      }

      this.lookup[ii] = output | 0;
    }
  },

  _onCurrentValueChange: function(evtName, newVal) {
    this._buildLookup(newVal);
  }
});

export default ContrastFilter;
