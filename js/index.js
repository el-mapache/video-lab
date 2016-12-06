import BrowserDetect from 'services/browser-detect';
import AppController from 'controllers/app';

import {
  FixedFilterView,
  VariableFilterView,
  ConvolutionFilterView
} from 'views';

import * as models from 'models';
import FilterCollection from 'collections/filter-collection';

var gsf = new models.GrayscaleFilter();
var bf = new models.BrightnessFilter();
var cf = new models.ContrastFilter();
var sf = new models.SaturationFilter();
var ivf = new models.InversionFilter();
var spf = new models.SepiaFilter();
var ef = new models.EmbossFilter();
var tf = new models.ThresholdFilter();
var byf = new models.BayerFilter();
var lrf = new models.LowResFilter();
var xof = new models.XORFilter();
var and = new models.AndFilter();
var mdf = new models.MedianFilter();
var sbf = new models.SobelFilter();
var lpf = new models.LaplaceFilter();
var shf = new models.SharpenFilter();
var blf = new models.BlurFilter();
var ebc = new models.EmbossConvolver();

var filterCollection = new FilterCollection({
  models: [gsf, cf, bf, sf, ivf, spf, ef, tf, byf, lrf, xof, mdf, sbf, lpf,shf,blf,ebc, and]
});

// Fixed Filters
new FixedFilterView({el: '#grayscale', model: gsf}).render();
new FixedFilterView({el: '#sepia', model: spf}).render();
new FixedFilterView({el: '#invert', model: ivf}).render();
new FixedFilterView({el: '#emboss', model: ef}).render();
new FixedFilterView({el: '#low-res', model: lrf}).render();
new FixedFilterView({el: '#bayer', model: byf}).render();
new FixedFilterView({el: '#xor', model: xof}).render();
new FixedFilterView({el: '#and', model: and}).render();

new VariableFilterView({el: '#saturation', model: sf}).render();
new VariableFilterView({el: '#contrast', model: cf}).render();
new VariableFilterView({el: '#brightness', model: bf}).render();
new VariableFilterView({el: '#threshold', model: tf}).render();
new VariableFilterView({el: '#median', model: mdf}).render();

new ConvolutionFilterView({el: '#sobel', model: sbf}).render();
new ConvolutionFilterView({el: '#laplace', model: lpf}).render();
new ConvolutionFilterView({el: '#sharpen', model: shf}).render();
new ConvolutionFilterView({el: '#blur', model: blf}).render();
new ConvolutionFilterView({el: '#embossC', model: ebc}).render();

if (BrowserDetect.isChrome()) {
  new AppController(filterCollection);
} else {
  alert("This page only supports Google Chrome, version 29 or higher.");
}
