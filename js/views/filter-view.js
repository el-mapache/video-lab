var FixedFilterView = VL.View.extend({
  template: document.getElementById('fixed-filter').innerHTML,
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