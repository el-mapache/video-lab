import Convolver from './convolver';

const Sharpen = Convolver.extend({
  defaults: {
    name: 'sharpen',
    type: 'convolver',
    matrix: [0,-1,0,-1,5,-1,0,-1,0],
    active: false
  }
});

export default Sharpen;
