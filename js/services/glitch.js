// These are the characters that will be randomly replaced in the image
const CHAR_SETS = [
  ["0",")","<",">",".","*","&","£","%","~","#","+","a","!","|","-"],
  ["a","b","c","d","e","f","z","x","v","n","m","o","i","y","q","w"]
];
const GLITCH_SIZES = ["64", "128", "256", "1024", "1024"];


// break this out into a generic throttle function at some point
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

const GlitchService = {
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

    for (let i = 0, charsLength = decodedData.length; i < charsLength; i += chunkLength) {
      chunks.push(decodedData.substring(i, i + chunkLength));
    }

    //Loop through chunks, leaving out the header chunk
    for(let i = 2; i <= chunkCount; i++) {

      //Create random number for the glitch decision
      const glitchRand =(Math.random() * 100 + 1) | 0;

      //create random numbers for selection of the glitch characters
      let char1Rand = (Math.random() * glitchCharsLength) | 0;
      let char2Rand = (Math.random() * glitchCharsLength) | 0;

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
    const base64data = btoa(chunks.join(''));

    //Put the glitched image into the glitched canvas
    const glitchedImg = new Image();
    glitchedImg.src = 'data:image/jpeg;base64,' + base64data;

    return glitchedImg.onload = function() {
      hasGlitched = true;
      intervalId = setInterval(tick, interval);
      return callback(this);
    };
  }
};

export default GlitchService;
