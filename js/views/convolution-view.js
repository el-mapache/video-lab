var ConvolutionFilterView = VL.View.extend({
  template: document.getElementById('convolver').innerHTML,

  events: {
    '.convolver click': 'toggleFilter'
  },

  render: function() {
    this.el.innerHTML = doT.compile(this.template)(this.model.data());
    return this;
  },

  toggleFilter: function(event) {
    this.model.set('active', !this.model.get('active'));
    this.render();
  }
});