import { Model } from './framework';

const BrightnessFilter = Model.extend({
  defaults: {
    'name':        'brightness',
    'type':        'filter',
    'active':       false,
    'potential':    'variable',
    'min':          -100,
    'max':          100,
    'step':         1,
    'currentValue': 40
  },

  init: function() {
    this.lookup = [];
    this._buildLookup(this.get('currentValue'));

    this.on('model.change.currentValue', this._onCurrentValueChange);
  },

  filter: function(imageData) {
    var data = imageData.data;

    var length = data.length;
    var ii = -4;

    while ((ii = ii + 4) < length) {
      data[ii]   = this.lookup[data[ii]];
      data[ii+1] = this.lookup[data[ii+1]];
      data[ii+2] = this.lookup[data[ii+2]];
    }

    return data;
  },

  _buildLookup: function(value) {
    var output;

    for (var ii = 0; ii < 256; ii++) {

      output = ii + value;

      this.lookup[ii] = output;
    }
  },

  _onCurrentValueChange: function(evtName, newVal) {
    this._buildLookup(newVal);
  }
});

export default BrightnessFilter;
