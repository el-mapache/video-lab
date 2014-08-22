var EmbossView = VL.View.extend({
  el: '#emboss',
  template: document.getElementById('fixed-filter').innerHTML,

  init: function(options) {
    this.model = options.model;
  },

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