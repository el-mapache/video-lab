import VL from 'lib/framework';
import convolutionTemplate from 'templates/convolution-filter.html';

var ConvolverFilterView = VL.View.extend({
  template: convolutionTemplate,

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

export default ConvolverFilterView;
