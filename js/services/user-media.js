const mediaConstraints = {
  audio: false,
  video: {
    width: { min: 640, ideal: 1280, max: 1920 },
    height: { min: 480, ideal: 720, max: 1080 },
    frameRate: 24
  }
};

const getUserMedia = (constraints) => {
  return window.navigator.mediaDevices.getUserMedia(constraints);
};


// flag indicating whether or not the user has been asked for access to
// their audio/video hardware by the program.
let hasRequestedAccess = false;
// the video stream we are requesting.
let mediaStream = null;

export default {
  getVideoStream: function(callback) {
    if (hasRequestedAccess) {
      return callback(mediaStream);
    }

    getUserMedia(mediaConstraints).then(function(stream) {
        mediaStream = stream;
        hasRequestedAccess = true;
        return callback(stream);
      }).catch(function(err) {
        console.log(err);
        console.log('An error occured');
        hasRequestedAccess = true;
        return callback(mediaStream);
      });
  }
};
