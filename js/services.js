var Services = {
  // Wrapper for the get user media api.
  UserMedia: (function() {
    var self = this;

    // the video stream we are requesting.
    var mediaStream = null;

    // flag indicating whether or not the user has been asked for access to
    // their audio/video hardware by the program.
    var hasRequestedAccess = false;

    function getUserMedia(constraints, onSuccess, onError) {
      return navigator.mediaDevices.getUserMedia(constraints);
    }

    return {
      getVideoStream: function(callback) {
        if (hasRequestedAccess) {
          return callback(mediaStream);
        }

        getUserMedia({
          audio: false,
          video: {
            width: { min: 640, ideal: 1280, max: 1920 },
            height: { min: 480, ideal: 720, max: 1080 },
            frameRate: 24
          }}).then(function(stream) {
            mediaStream = stream;
            hasRequestedAccess = true;
            return callback(stream);
          }).catch(function(err) {
            console.log(err);
            hasRequestedAccess = true;
            return callback(null);
          });
      }
    };
  }()),
  Browser: (function() {
    var CHROME_REGEX = /Chrome/;

    return {
      isChrome: function() {
        return chrome && CHROME_REGEX.test(navigator.appVersion);
      }
    };
  }())
};
