import Convolver from './convolver';

const SobelFilter = Convolver.extend({
  defaults: {
    name: 'sobel',
    type: 'convolver',
    matrix: [-1, 0, 1, -2, 0, 2, -1, 0, 1],
    active: false
  }
});

export default SobelFilter;
