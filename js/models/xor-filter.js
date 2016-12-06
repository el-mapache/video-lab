import VL from 'lib/framework';

const XORFilter = VL.Model.extend({
	defaults: {
   	'name':        'xor',
    'type':        'filter',
    'active':       false,
    'potential':    'fixed'
  },

	filter: function(imageData) {
		var data = imageData.data;
    var l = data.length;

    var ii = -4;
    var r,g,b;

    while (l > 0) {
      ii = l
      l = l - 4;
      var counter = ii;
      r = data[counter];
      g = data[counter+1];
      b = data[counter+2];

      data[ii] =   r ^ (data[ii / 2] || 255);
      data[ii+1] = g ^ (data[ii - 20000] || 255);
      data[ii+2] = b ^ (data[ii * 2] || 255);
    }

    return data
	}
});

export default XORFilter;
