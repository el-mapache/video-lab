(function(root) {
  var EventEmitter = function() {};
  root.VL = root.VL || {};

  EventEmitter.prototype = {
    _events: {},
    on: function(event, fn, context) {
      this._events = this._events || {};
      this._events[event] = this._events[event] || [];
      this._events[event].push({fn: fn, ctx: context || this});
    },

    unbind: function(event, fn) {
      this._events = this._events || {};
      if (!event in this._events) return;

      var eventList = this._events[event];

      fn ? eventList.splice(eventList.indexOf(fn), 1) : eventList = null;
    },

    trigger: function(event) {
      this._events = this._events || {};
      var events = this._events[event] || [];
      
      var ii = 0;
      var len = events.length;
      
      var allEvents = this._events['all'];

      if (allEvents) {
        var iii = 0;
        var length = allEvents.length;
        while (iii < length) {
          var e = allEvents[iii];

          e.fn.apply(e.ctx, [].slice.call(arguments));
          iii++;
        }
      }

      while (ii < len) {
        var e = events[ii];
        e.fn.apply(e.ctx, [].slice.call(arguments));
        ii++;
      }
    },

    attachTo: function(destObject) {
      var props = ['on', 'unbind', 'trigger'];
      var ii = -1;

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