import * as tf from '@tensorflow/tfjs';
import {
  fetch,
  decodeJpeg,
  bundleResourceIO,
} from '@tensorflow/tfjs-react-native';

export default loadModel = async () => {
  const modelJson = require('./model.json');
  const modelWeights1 = require('./weight1.bin');
  const modelWeights2 = require('./weight2.bin');
  const model = await tf.loadLayersModel(
    bundleResourceIO({modelJson, modelWeights: [modelWeights1, modelWeights2]}),
    bundleResourceIO(modelJson, modelWeights1),
    // bundleResourceIO({
    //   modelJson,
    //   modelWeights: [modelWeights1, modelWeights2],
    //   binaryPaths: ['weight1.bin', 'weight2.bin'],
    // }),
  );

  return model;
};
