var ContrastView = VL.View.extend({
	el: '#contrast',
	template: document.getElementById('variable-filter').innerHTML,

	init: function(options) {
		this.model = options.model;
    console.log(this.model.attributes)
	},

	events: {
		'.filter click': 'toggleFilter',
    '#contrast-filter change': 'changeModelValue'
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
