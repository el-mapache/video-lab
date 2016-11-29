import VL from '../framework';
import doT from '../dot.js';
const template = require('../templates/convolver.html');

const ConvolutionFilterView = VL.View.extend({
  template: template,

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

export default ConvolutionFilterView;
