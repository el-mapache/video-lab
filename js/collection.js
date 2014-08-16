(function(root) {

  root.VL = root.VL || {};
  
  var elements = {};

  function Collection() {
    this.length = 0;
  }

  Collection.prototype.add = function(key, value) {
    if (elements[key]) {
      return this.remove(key);
    }

    elements[key] = value;
    this.length++;

    return elements;
  };

  Collection.prototype.remove = function(key) {
    if (!elements[key]) return null;

    delete elements[key];
    this.length--;

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

  Collection.prototype.constructor = Collection;

  root.VL.Collection = Collection;

  return root;
}(window));