var BrightnessView = VL.View.extend({
	el: '#brightness',
	template: document.getElementById('variable-filter').innerHTML,

	init: function(options) {
		this.model = options.model;
	},

	events: {
		'.filter click': 'toggleFilter',
    '#brightness-filter change': 'changeModelValue'
	},

	render: function() {
		this.el.innerHTML = doT.compile(this.template)(this.model.data());
		return this;
	},

	toggleFilter: function(event) {
		this.model.set('active', event.target.checked);
	},

  changeModelValue: function(event) {
    if (!this.model.get('active')) return;
    this.model.set('currentValue', +event.target.value);
  }
});
