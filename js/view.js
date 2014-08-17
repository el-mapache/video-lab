(function(root) {
  root.VL = root.VL || {};

  var _bindings = {};


  var View = function(options) {
    options = options || {};

    this.el = null;
    this.template = null;
    this.model = null;
    this.collection = null;

    this.init.apply(this, arguments);
  };
    
  View.extend = function(proto) {
    var parent = this;
    var child;

    if (proto && proto.hasOwnProperty('constructor')) {
      child = proto.constructor;
    } else {
      child = function() {
        return parent.apply(this, arguments);
      };
    }

    extend(child, parent);

    var Temp = function() {this.constructor = child;};
    Temp.prototype = parent.prototype;
    child.prototype = new Temp;
    
    extend(child.prototype, proto);

    child.__super__ = parent.prototype;

    return child;
  };

  extend(View.prototype, {
    render: function() {
      return this;
    },
    
    init: function(options) {
      console.log('initing')
      return this;
    }
  });
  
  root.VL.Events.prototype.attachTo(View.prototype);

  root.VL.View = View;

  return root;
}(window));
