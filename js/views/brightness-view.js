var BrightnessView = VL.View.extend({
	el: '#brightness',
	template: '<form oninput="level.value = brightness.valueAsNumber;">' +
              '<input class="filter" type="checkbox" name="filter"/>Brightness' +
              '<input type="range" min="0" max="100" id="brightness-filter" name="brightness" value="40"/>' +
              '<output style="margin-left: 20px; padding:14px;" for="brightness-filter" name="level">0</output>' +
            '</form>',	

	init: function(options) {
		this.model = options.model;
	},

	events: {
		'.filter click': 'toggleFilter',
    '#brightness-filter change': 'changeModelValue'
	},

	render: function() {
		this.el.innerHTML = this.template;
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
