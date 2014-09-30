var FilterCollectionView = VL.View.extend({
  init: function(options) {
    this.activeFilters = new FilterCollection();
    this.collection.on('model.change.active',this.onFilterToggle.bind(this));
  },

  onFilterToggle: function(evt, newVal, oldVal, model) {
    if (newVal) {
      this.addFilter(model);
    } else {
      this.activeFilters.remove(model);
    }
  },

  addFilter: function(filter) {
    this.activeFilters.add(filter);
  },

  process: function(imageData) {
    this.activeFilters.each(function(filter) {
      var type = filter.get('type'); 

      if (type === 'convolver') {
        imageData = filter.convolve(imageData, filter.get('matrix'));
      } else {
        imageData.data = filter.filter(imageData);  
      }
    });
    
    return imageData;
  }
});
