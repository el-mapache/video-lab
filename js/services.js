var Services = {
  UserMedia: (function() {
    var self = this;

    var mediaStream = null;
    var hasRequestedAccess = false;

    function getUserMedia(opts, onSuccess, onError) {
      navigator.getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;

      navigator.getUserMedia(opts, onSuccess, onError);
    }

    return {
      getStream: function(callback) {
        if (hasRequestedAccess) return callback(mediaStream);

        getUserMedia(
          {video: true},
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
    var CHROME_REGEX = /Chrome\/(2{1}9{1}|3{1}[0-9])/;

    return {
      isChrome: function() {
        return chrome && CHROME_REGEX.test(navigator.appVersion);
      }
    };
  }())
};