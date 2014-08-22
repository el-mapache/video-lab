(function(root) {
  root.VL = root.VL || {};
  
  var EventEmitter = function() {};

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



  var Collection = function(options) {
    options = options || {};

    this.init.apply(this, arguments);
  };

  Utils.extend(Collection.prototype, {
    length: 0,
    modelsLookup: {},
    models: [],

    init: function() {},

    add: function(models) {
      models = models instanceof Array ? models : [models];
      
      Utils.forEach(models, this._addModel.bind(this));
      
      return this;
    },

    remove: function(key) {
      return 'dont use me';
    
      //This requires more work to actually update the lookup table, etc
      // Luckily i wont be removing anything yet.

      // if (!this.elements[key]) return null;

      // delete this.elements[key];
      // this.length--;
      // this.trigger('collection.remove');

      // return this.elements;

    },

    at: function(index) {
      return this.models[index] || null;
    },

    each: function(callback) {
      var key;
      for (key in this.elements) {
        if (this.elements.hasOwnProperty(key)) {
          callback(this.elements[key]);
        }
      }
    },

    get: function(id) {
      if (!id) {
        return this.getAll();
      }

      return this.models[this.modelsLookup[id]];
    },

    getAll: function() {
      return this.models;
    },

    _passModelEvent: function(eventName, newVal, oldVal, model) {
      this.trigger(eventName, newVal, oldVal, model);
    },

    _addModel: function(model, index) {
      // The model is already in the collection.
      if (this.modelsLookup[model.id]) {
        return;
      }

      // Add the model to the list of models.
      this.models.push(model);

      // Add an entry into the lookup table.
      this.modelsLookup[model.id] = this.length;

      model.on('all', this._passModelEvent, this);

      this.length++;

      this.trigger('collection.add');
    }
  });

  root.VL.Events.prototype.attachTo(Collection);

  root.VL.Collection = Collection;




  var Model = function(options) {
    this.id = 'model' + uniqueId();
    this.attributes = {};

    this._buildAttributes();
    this.init.apply(this, arguments);
  };

  Utils.extend(Model.prototype, {
    init: function(options) {},

    set: function(prop, value) {
      var attrs = this.attributes;

      if (!attrs.hasOwnProperty(prop)) return;

      // Stpre a reference to the previous value to determine whether a 
      // 'change' event should fire.
      var old = attrs[prop];

      attrs[prop] = value;

      if (value !== old) {
        this.trigger('model.change.' + prop, value, old, this);
      }

      return attrs[prop];
    },

    get: function(prop) {
      var got = this.attributes[prop];

      if (!got) return null;

      return got;
    },

    _buildAttributes: function() {
      var defaults = Utils.extend({}, this.defaults);

      if (!defaults || typeof defaults !== 'object') {
        return;
      }

      Utils.extend(this.attributes, defaults);
    },

    data: function() {
      return Utils.extend({}, this.attributes);
    }
  });

  root.VL.Events.prototype.attachTo(Model);
  root.VL.Model = Model;



  var View = function(options) {
    this.id = 'view' + uniqueId();
    options = options || {};

    this._getElement();
    this._bindEvents();

    this.init.apply(this, arguments);
  };

  Utils.extend(View.prototype, {
    render: function() {
      return this;
    },
    
    init: function(options) {
      return this;
    },

    find: function(selector) {
      return this.el.querySelector(selector);
    },

    _getElement: function() {
      if (!this.el) {
        this.el = document.createElement('div');
      }

      this.el = document.querySelector(this.el);

      return this;
    },

    _bindEvents: function() {
      var events = this.events;

      if (!events) return;


      for (var event in events) {
        if (!event) continue;

        var method = this[events[event]];

        if (typeof method !== 'function') {
          throw new Error('Method not found on view.');
        }

        var eventPair = event.split(' ');
        var selector = eventPair[0];
        var eventName = eventPair[1];

        this._onEvent(this.el, selector, eventName, method);
      }
    },

    _onEvent: function(parent, target, eventName, callback) {
      function isEventTarget(event) {
       if (event.target === this.find(target)) {
          callback.call(this, event);
        }
      }

      this.el.addEventListener(eventName, isEventTarget.bind(this));
    }
  });
  
  root.VL.Events.prototype.attachTo(View);

  root.VL.View = View;



  /* Helpers */
  var extend = function(proto) {
    var parent = this;
    var child;

    if (proto && proto.hasOwnProperty('constructor')) {
      child = proto.constructor;
    } else {
      child = function() {
        return parent.apply(this, arguments);
      };
    }


    var Parent = function() {this.constructor = child;};
    Parent.prototype = parent.prototype;
    child.prototype = new Parent;
    
    Utils.extend(child.prototype, proto);

    return child;
  };

  var uniqueId = (function() {
    var idCounter = 0;

    return function() {
      var id = idCounter;
      idCounter++;
      return id;
    };
  }());

  root.VL.View.extend = extend;
  root.VL.Model.extend = extend;
  root.VL.Collection.extend = extend;

  return root;
}(window));
