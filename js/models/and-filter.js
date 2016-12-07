import VL from 'lib/framework';

const AndFilter = VL.Model.extend({
	defaults: {
   	'name':        'and',
    'type':        'filter',
    'active':       false,
    'potential':    'fixed'
  },

	filter: function(imageData) {
		var data = imageData.data;
    var l = data.length;

    var ii = -4;
    var r,g,b;

    while ((ii = ii + 4) < l) {
      r = data[ii];
      g = data[ii+1];
      b = data[ii+2];

      data[ii] =   r & (data[ii / 2] || 255);
      data[ii+1] = g & (data[ii - 20000] || 255);
      data[ii+2] = b & (data[ii * 2] || 255);
    }

    return imageData;
	}
});

export default AndFilter;
