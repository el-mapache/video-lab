var FilterCollectionView = VL.View.extend({
  init: function(options) {
    this.activeFilters = new FilterCollection();
    this.collection.on('model.change.active',this.onFilterToggle.bind(this));
  },

  onFilterToggle: function(evt, newVal, oldVal, model) {
    if (newVal) {
      this.addFilter(model);
    } else {
      this.removeFilter(model);
    }
  },

  addFilter: function(filter) {
    this.activeFilters.add(filter);
  },

  removeFilter: function(filter) {
    this.activeFilters.remove(filter);
  },

  process: function(imageData, zones) {
    this.activeFilters.each(function(filter) {
      var type = filter.get('type');

      if (type === 'convolver') {
        imageData = filter.convolve(imageData, filter.get('matrix'));
      } else {
        imageData.data = filter.filter(imageData, zones);
      }
    });

    return imageData;
  }
});
