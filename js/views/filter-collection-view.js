import VL from 'lib/framework';
import FilterCollection from 'collections/filter-collection';

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

  process: function(imageData, done) {
//     var filterFns = this.activeFilters.map(function(filter) {
//       var type = filter.get('type');
//       if (type === 'convolver') {
//         return filter.convolve;
//       } else {
//         return filter.filter;
//       }
//     });
//
//     worker.onMessage = function(event) {
//       console.log('all done!', event)
// //      done(event.data.result);
//     };
//
//     worker.postMessage({data: imageData, filters: filterFns});
    this.activeFilters.each(function(filter) {
      var type = filter.get('type');
      imageData = filter[type === 'convolver' ? 'convolve' : 'filter'](imageData);
    });

    return imageData;
  }
});

export default FilterCollectionView;
