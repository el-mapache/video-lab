(function(window) {
  var root = window;
  root.VL = window.VL || {};
  
  VL.Contrast = function(el) {
    this.el = el;

    this.active = false;
    
    this.lookup = [];

    this.template = '<form onsubmit="return false;" oninput="level.value = contrast.valueAsNumber;">' + 
      '<input id="ctog" type="checkbox"><span  style="margin-right: 20px;">Toggle</span>' +
      '<label for="contrast">Contrast</label>' +
      '<input type="range" min="-100" max="100" id="contrast-filter" name="contrast" value="0"/>' +
      '<output style="margin-left: 20px; padding:14px;" for="contrast-filter" name="level">0</output>' +
    '</form>';

    

    this.onLevelChange = function(event) {
      this.buildLookup(event.target.value);
    };

    this.render = function() {
      this.el.innerHTML = this.template;
      return this;
    };

    this.buildLookup = function(fromValue) {
      var c = (100.0 + 24) / 100.0;

      c *= c;

      for (var i = 0; i < 256; i++) {
        fromValue = i;
        fromValue = fromValue / 255.0;
        fromValue -= 0.5;
        fromValue *= c;
        fromValue += 0.5;
        fromValue *= 255;

        if (fromValue < 0) {
          fromValue = 0;
        }

        if (fromValue > 255) {
          fromValue = 255;
        }
        this.lookup[i] = fromValue | 0;  
      }
    };

    this.bindEvents = function() {
      var self = this;
      this.el.onclick = function(event) {
        if (event.target.id !== 'ctog') return;
        self.active = !self.active;

        if (self.active) return self.register;
        return self.deregister;
      };  
    };

    this.register = function() {
      this.trigger('attach', 'filter', 'contrast', this.filter);
    };

    this.deregister = function() {};


    this.buildLookup(0);

    this.filter = (function(lookup) {
      var lookup = lookup;

      return function(imageData) {
        var data = imageData.data;
        var length = data.length;
        var r,g,b;
        var i = 0;

        for( i; i < length; i = i + 4) {
          data[i] =   contrast_lookup[data[i]];
          data[i+1] = contrast_lookup[data[i+1]];
          data[i+2] =  contrast_lookup[data[i+2]];
        }

        return data;
      };

    }(this.lookup));

    this.bindEvents();
  };

  return root;
}(window));
