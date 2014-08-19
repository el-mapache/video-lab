var GrayscaleView = VL.View.extend({
	el: '#grayscale',
	template: '<input class="filter" type="checkbox" name="filter" value="grayscale">Grayscale<br>',
	

	init: function(options) {
		this.model = options.model;
	},

	events: {
		'.filter click': 'toggleFilter'
	},

	render: function() {
		this.el.innerHTML = this.template;
		return this;
	},

	toggleFilter: function(event) {
		this.model.set('active', event.target.checked);
	}
});
