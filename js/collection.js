(function(root) {

  root.VL = root.VL || {};
  
  var elements = {};
  var _length = 0

  var Collection = function() {};

  Collection.prototype.add = function(key, value) {
    if (elements[key]) {
      return this.remove(key);
    }

    elements[key] = value;
    _length++;

    this.trigger('Collection:Add');

    return elements;
  };

  Collection.prototype.remove = function(key) {
    if (!elements[key]) return null;

    delete elements[key];
    _length--;
    this.trigger('Collection:Remove');

    return elements;

  };

  Collection.prototype.each = function(callback) {
    var key;
    for (key in elements) {
      if (elements.hasOwnProperty(key)) {
        callback(elements[key]);
      }
    }
  };

  Collection.prototype.get = function(key) {
    return key ? elements[key] : this.getAll();
  };

  Collection.prototype.getAll = function() {
    return elements;
  };

  Collection.prototype.length = function() {
    return _length;
  };

  Collection.prototype.constructor = Collection;

  root.VL.Events.prototype.attachTo(Collection);

  root.VL.Collection = Collection;

  return root;
}(window));