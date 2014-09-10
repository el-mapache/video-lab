var BlurFilter = Convolver.extend({
  defaults: {
    name: 'blur',
    type: 'convolver',
    matrix: [1/9,1/9,1/9,1/9,1/9,1/9,1/9,1/9,1/9],
    active: false
  }
});
