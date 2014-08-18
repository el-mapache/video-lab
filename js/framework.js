(function(root) {
  root.VL = root.VL || {};
  
  var elements = {};
  var _length = 0

  var Collection = function(options) {
    options = options || {};

    this.init.apply(this, arguments);
  };

  Utils.extend(Collection.prototype, {
    length: 0,
    elements: {},

    init: function() {},

    add: function(key, value) {
      if (this.elements[key]) {
        return this.remove(key);
      }

      this.elements[key] = value;
      this.length++;

      this.trigger('collection.add');

      return this.elements;
    },

    remove: function(key) {
      if (!this.elements[key]) return null;

      delete this.elements[key];
      this.length--;
      this.trigger('collection.remove');

      return this.elements;

    },

    each: function(callback) {
      var key;
      for (key in this.elements) {
        if (this.elements.hasOwnProperty(key)) {
          callback(this.elements[key]);
        }
      }
    },

    get: function(key) {
      return key ? this.elements[key] : this.getAll();
    },

    getAll: function() {
      return this.elements;
    }
  });

  root.VL.Events.prototype.attachTo(Collection);

  root.VL.Collection = Collection;




  var Model = function(options) {
    this.id = 'model' + uniqueId();
    this._buildAttributes();
    this.init.apply(this, arguments);
  };

  Utils.extend(Model.prototype, {
    attributes: {},

    init: function() {},

    set: function(prop, value) {
      var attrs = this.attributes;

      if (!attrs.hasOwnProperty(prop)) return;

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
      var defaults = this.defaults;

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


    var Temp = function() {this.constructor = child;};
    Temp.prototype = parent.prototype;
    child.prototype = new Temp;
    
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
