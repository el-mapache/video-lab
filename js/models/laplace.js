var LaplaceFilter = Convolver.extend({
  defaults: {
    name: 'laplace',
    type: 'convolver',
    matrix: [1,1,1,1,-8,1,1,1,1],
    active: false
  }
});