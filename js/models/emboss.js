import Convolver from './convolver';

const Emboss = Convolver.extend({
  defaults: {
    name: 'emboss',
    type: 'convolver',
    matrix: [-2,-1,0,-1,1,1,0,1,2],
    active: false
  }
});

export default Emboss;
