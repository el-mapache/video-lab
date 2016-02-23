var Services = {
  // Wrapper for the get user media api.
  UserMedia: (function() {
    var self = this;

    // the video stream we are requesting.
    var mediaStream = null;

    // flag indicating whether or not the user has been asked for access to
    // their audio/video hardware by the program.
    var hasRequestedAccess = false;

    function getUserMedia(opts, onSuccess, onError) {
      navigator.getUserMedia = navigator.mozGetUserMedia    ||
                               navigator.webkitGetUserMedia ||
                               navigator.getUserMedia;

      navigator.getUserMedia(opts, onSuccess, onError);
    }

    return {
      getVideoStream: function(callback) {
        if (hasRequestedAccess) {
          return callback(mediaStream);
        }

        getUserMedia({
          video: {
            mandatory: {
              maxWidth: 640,
              maxHeight: 360
            }
          }},
          function(stream) {
            mediaStream = stream;
            hasRequestedAccess = true;
            return callback(stream);
          }, function(err) {
            console.log(err);
            hasRequestedAccess = true;
            return callback(null);
          }
        );
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
