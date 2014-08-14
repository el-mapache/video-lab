(function(root) {
  var EventEmitter = function() {};
  root.VL = root.VL || {};

  EventEmitter.prototype = {
    _events: {},
    bind: function(event, fn) {
      this._events[event] = this._events[event] || [];
      this._events[event].push(fn);
    },

    unbind: function(event, fn) {
      if (!event in this._events) return;

      var eventList = this._events[event];

      fn ? eventList.splice(eventList.indexOf(fn), 1) : eventList = null;
    },

    trigger: function(event) {
      var events = this._events[event];

      if (!events || events.length === 0) return;
      
      var ii = 0;
      var len = events.length;
      
      while (ii < len) {
        events[ii].apply(this, [].prototype.slice.call(arguments));
      }
    },

    attachTo: function(destObject) {
      var props = ['bind', 'unbind', 'trigger'];
      var ii = 0;

      while ((ii = ii + 1) < 3) {
        if ( typeof destObject === 'function' ) {
          destObject.prototype[props[ii]]  = this[props[ii]];
        } else {
          destObject[props[ii]] = this[props[ii]];
        }
      }
    }
  };

  root.VL.Events = EventEmitter;
  return root;
}(window));