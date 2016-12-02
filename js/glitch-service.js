// These are the characters that will be randomly replaced in the image
var CHAR_SETS = [
  ["0",")","<",">",".","*","&","£","%","~","#","+","a","!","|","-"],
  ["a","b","c","d","e","f","z","x","v","n","m","o","i","y","q","w"]
];

var GLITCH_SIZES = ["64", "128", "256", "1024", "1024"];
var glitchInterval = 50;
var timeTillGlitch = 0;
var hasGlitched = false;
var interval = 1; // in ms
var intervalId = 0;

var tick = function() {
  timeTillGlitch += interval;

  if (timeTillGlitch === glitchInterval) {
    hasGlitched = false;
  }

};

var GlitchService = {
  glitch: function(dataUrl, callback) {
    if (hasGlitched && timeTillGlitch !== glitchInterval) {
      return;
    }

    clearInterval(intervalId);
    timeTillGlitch = 0;

    var chunks = [];

    var glitchChars = CHAR_SETS[(Math.random() * 1 + 1) | 0];
    var glitchCharsLength = glitchChars.length;
    var chunkCount = GLITCH_SIZES[(Math.random() * 4 + 1) | 0];

    var decodedData = atob(dataUrl.replace('data:image/jpeg;base64,', ''));
    var chunkLength = ((decodedData.length - 1) / chunkCount) | 0;
    var chunks = [];

    for (var i = 0, charsLength = decodedData.length; i < charsLength; i += chunkLength) {
      chunks.push(decodedData.substring(i, i + chunkLength));
    }

    //Loop through chunks, leaving out the header chunk
    for(var i=2;i<=chunkCount;i++) {

      //Create random number for the glitch decision
      var glitchRand =(Math.random() * 100 + 1) | 0;

      //create random numbers for selection of the glitch characters
      var char1Rand = (Math.random()*glitchCharsLength) | 0;
      var char2Rand = (Math.random()*glitchCharsLength) | 0;

      if (char2Rand === char1Rand) {
        char2Rand = "9";
      }

      // If random number is odd
      if(glitchRand % 2 || chunkCount === GLITCH_SIZES.legnth - 1) {
        //glitch the chunk
        chunks[i] = chunks[i].replace(glitchChars[char1Rand],glitchChars[char2Rand]);
      }

    } //End chunk loop

    //Base64 encode the glitched data
    var base64data = btoa(chunks.join(''));

    //Put the glitched image into the glitched canvas
    glitched_img = new Image();
    glitched_img.src = 'data:image/jpeg;base64,' + base64data;
    return glitched_img.onload = function() {
      hasGlitched = true;
      intervalId = setInterval(tick, interval);
      return callback(this);
    };
  }
};
