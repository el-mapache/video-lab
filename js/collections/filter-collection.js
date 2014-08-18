var FilterCollection = VL.Collection.extend({
	init: function(options) {
    options || (options = {});
    var models = options.models || [];
    while (models.length > 0) {
      var model = models.shift();

      this.add(model);
    }
  }
});
