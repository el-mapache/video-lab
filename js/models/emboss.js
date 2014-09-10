var EmbossConvolver = Convolver.extend({
  defaults: {
    name: 'emboss',
    type: 'convolver',
    matrix: [-2,-1,0,-1,1,1,0,1,2],
    active: false
  }
});