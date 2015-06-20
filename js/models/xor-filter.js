var XORFilter = VL.Model.extend({
	defaults: {
   	'name':        'xor',
    'type':        'filter',
    'active':       false,
    'potential':    'fixed'
  },

	filter: function(imageData, direction) {
		var data = imageData.data;
    var l = data.length;
    
    var ii = -4;
    var r,g,b;
    var zone = null;
    // while (zone = direction.zones.shift()) {
    //   //try getting all points along this line
    //   var ii = (zone.x-zone.u) + ((imageData.width) *(zone.y+zone.v));
    //   r = data[ii];
    //   g = data[ii+1];
    //   b = data[ii+2];
    //          data[ii] =   r ^ (data[ii / 2] || 255) >> 4;
    //     data[ii+1] = g ^ (data[ii - 20000] || 255) >> 4;
    //     data[ii+2] = b ^ (data[ii * 2] || 255) >> 4;
      
    //     // data[ii] =   r ^ (currentFileData[ii]);
    //     // data[ii+1] = g ^ (currentFileData[ii+1]);
    //     // data[ii+2] = b ^ (currentFileData[ii+2]);
    // }
    // return data;

    while (l > 0) {
      ii = l
      l = l -4;
      var counter = ii;
      //for (counter; counter > 0; counter -= 4) {
        r = data[counter];
        g = data[counter+1];
        b = data[counter+2];

        if (currentFileData) {
          data[counter] =   r ^ (currentFileData[counter]);
          data[counter+1] = g ^ (currentFileData[counter+1]);
          data[counter+2] = b ^ (currentFileData[counter+2]);
        } else {
          data[ii] =   r ^ (data[ii / 2] || 255);
          data[ii+1] = (data[ii - 20000] || 255) ^ g;
          data[ii+2] = b ^ (data[ii * 2] || 255);
        }
      //}
    }

    return data
	}
});
