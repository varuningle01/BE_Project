import React, {useState, useEffect} from 'react';
import {Alert, Image} from 'react-native';
import CameraScreen from './CameraScreen';
import * as tf from '@tensorflow/tfjs';
import {Canvas, Image as CanvasImage, decode} from 'react-native-canvas';

import loadModel from './LoadModel';

export default function CamScreen() {
  const [model, setModel] = useState(null);

  useEffect(() => {
    const loadModelAsync = async () => {
      const loadedModel = await loadModel();
      setModel(loadedModel);
    };

    loadModelAsync();
  }, []);

  async function onBottomButtonPressed(event) {
    const captureImages = event.captureImages;
    const imageObject = captureImages[0];
    // const image = Image.resolveAssetSource({uri: imageObject.uri});
    // const {width, height} = image;
    // const imageData = {
    //   data: new Uint32Array(width * height),
    //   width: width,
    //   height: height,
    // };
    // const canvas = document.createElement('canvas');
    // canvas.width = width;
    // canvas.height = height;
    // const ctx = canvas.getContext('2d');
    // const image = await CanvasImage.createCanvas(imageObject.width, imageObject.height);
    // const ctx = image.getContext('2d');
    // const img = await decode({ uri: imageObject.uri });
    // ctx.drawImage(image, 0, 0);
    // const imageDataObject = ctx.getImageData(0, 0, width, height);
    // const pixelData = new Uint32Array(imageDataObject.data.buffer);
    // imageData.data.set(pixelData);
    // predictPlantHealth(imageData.data);
    const image = await CanvasImage.createCanvas(
      imageObject.width,
      imageObject.height,
    );
    const ctx = image.getContext('2d');
    const img = await decode({uri: imageObject.uri});
    ctx.drawImage(img, 0, 0);

    const imageDataObject = ctx.getImageData(
      0,
      0,
      imageObject.width,
      imageObject.height,
    );
    const pixelData = new Uint32Array(imageDataObject.data.buffer);

    const imageData = {
      data: pixelData,
      width: imageObject.width,
      height: imageObject.height,
    };

    predictPlantHealth(imageData.data);
  }

  //   // const captureImages = JSON.stringify(event.captureImages);

  //   Alert.alert(
  //     `"${event.type}" Button Pressed`,
  //     `${captureImages}`,
  //     [{text: 'OK', onPress: () => predictPlantHealth(imageData)}],
  //     {cancelable: false},
  //     console.log(captureImages),
  //   );
  //   // console.log(predictPlantHealth);
  //
  //   return imageData;
  // }

  const predictPlantHealth = async imageData => {
    const tensor = tf.browser.fromPixels(imageData, 4);
    const resizedTensor = tf.image.resizeBilinear(tensor, [224, 224]);
    const preprocessedTensor = resizedTensor.toFloat().div(255);
    const batchedTensor = preprocessedTensor.expandDims(0);
    const predictions = await model.predict(batchedTensor).data();
    Alert.alert('Predictions', JSON.stringify(predictions));

    tensor.dispose();
    resizedTensor.dispose();
    preprocessedTensor.dispose();
    batchedTensor.dispose();
  };

  useEffect(() => {
    if (model) {
      predictPlantHealth();
    }
  }, [model]);

  return (
    <CameraScreen
      actions={{rightButtonText: 'Done', leftButtonText: 'Cancel'}}
      onBottomButtonPressed={event => onBottomButtonPressed(event)}
      flashImages={{
        on: require('../assets/images/flashOn.png'),
        off: require('../assets/images/flashOff.png'),
        auto: require('../assets/images/flashAuto.png'),
      }}
      cameraFlipImage={require('../assets/images/cameraFlipIcon.png')}
      captureButtonImage={require('../assets/images/cameraButton.png')}
      torchOnImage={require('../assets/images/torchOn.png')}
      torchOffImage={require('../assets/images/torchOff.png')}
      showCapturedImageCount
    />
  );
}
