import VL from 'lib/framework';
import fixedFilterTemplate from 'templates/fixed-filter.html';

var FixedFilterView = VL.View.extend({
  template: fixedFilterTemplate,
  events: {
    '.filter click': 'toggleFilter'
  },

  render: function() {
    this.el.innerHTML = doT.compile(this.template)(this.model.data());
    return this;
  },

  toggleFilter: function(event) {
    this.model.set('active', event.target.checked);
  }
});

export default FixedFilterView;
