var ContrastView = VL.View.extend({
	el: '#contrast',
	template: '<form oninput="level.value = contrast.valueAsNumber;">' +
              '<input class="filter" type="checkbox" name="filter"/>Contrast' +
              '<input type="range" min="-100" max="100" id="contrast-filter" name="contrast" value="24"/>' +
              '<output style="margin-left: 20px; padding:14px;" for="contrast-filter" name="level">0</output>' +
            '</form>',	

	init: function(options) {
		this.model = options.model;
	},

	events: {
		'.filter click': 'toggleFilter',
    '#contrast-filter change': 'changeModelValue'
	},

	render: function() {
		this.el.innerHTML = this.template;
		return this;
	},

	toggleFilter: function(event) {
    console.log('hey')
		this.model.set('active', event.target.checked);
	},

  changeModelValue: function(event) {
    if (!this.model.get('active')) return;
    this.model.set('currentValue', +event.target.value);
  }
});
