import Convolver from './convolver';

const Blur = Convolver.extend({
  defaults: {
    name: 'blur',
    type: 'convolver',
    matrix: [1/9,1/9,1/9,1/9,1/9,1/9,1/9,1/9,1/9],
    active: false
  }
});

export default Blur;
