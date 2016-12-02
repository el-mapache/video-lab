import variableFilterTemplate from 'templates/variable-filter.html';

var VariableFilterView = VL.View.extend({
  template: variableFilterTemplate,

  events: {
    '.filter click': 'toggleFilter',
    '.variable-filter input': 'changeModelValue'
  },

  render: function() {
    this.el.innerHTML = doT.compile(this.template)(this.model.data());
    return this;
  },

  toggleFilter: function(event) {
    var isToggled = event.target.checked;

    var newState = {
      active: isToggled
    };

    if (isToggled) {
      newState['currentValue'] = +this.el.querySelector('.variable-filter').value;
    }

    this.model.set(newState);
  },

  changeModelValue: function(event) {
    if (!this.model.get('active')) {
      return;
    }

    this.model.set('currentValue', +event.target.value);
  }
});

export default VariableFilterView;
