'use strict';
import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { Camera } from 'expo-camera';
import Icon from 'react-native-vector-icons/AntDesign';
import { Button } from 'native-base';
import googleCloud from '../config/config';

interface Props {}

interface State {
  scanning: boolean;
  hasPermission: boolean | null;
  type: number;
  photo: string;
  fullTextAnnotation: string;
  uri: string;
}

export default class Scanner extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      scanning: false,
      hasPermission: null,
      type: Camera.Constants.Type.back,
      photo: '',
      fullTextAnnotation: '',
      uri: '',
    };

    this.setHasPermission = this.setHasPermission.bind(this);
    this.setType = this.setType.bind(this);
    this.setScanning = this.setScanning.bind(this);
    this.setSnap = this.setSnap.bind(this);
    this.callGoogleVIsionApi = this.callGoogleVIsionApi.bind(this);
  }

  componentDidMount() {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      this.setHasPermission(status === 'granted');
    })();
  }

  setHasPermission(hasPermission: boolean) {
    this.setState({
      hasPermission,
    });
  }

  setType() {
    let currentState: number = this.state.type;
    let willState: number =
      currentState === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back;
    this.setState({
      type: willState,
    });
  }

  setScanning(status: boolean) {
    this.setState({
      scanning: status,
    });
  }

  setSnap = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      let photo = await this.camera.takePictureAsync(options);
      this.setState(
        {
          photo: photo.base64,
          scanning: false,
          uri: photo.uri,
        }
        // () => this.callGoogleVIsionApi(this.state.photo)
      );
    }
  };

  callGoogleVIsionApi = async (base64: String) => {
    let url: string = googleCloud.api + googleCloud.apiKey;
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        requests: [
          {
            image: {
              content: base64,
            },
            features: [
              { type: 'LABEL_DETECTION', maxResults: 10 },
              { type: 'TEXT_DETECTION', maxResults: 5 },
              { type: 'DOCUMENT_TEXT_DETECTION', maxResults: 5 },
              { type: 'CROP_HINTS', maxResults: 5 },
              { type: 'WEB_DETECTION', maxResults: 5 },
            ],
          },
        ],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          fullTextAnnotation: data.responses[0].fullTextAnnotation.text,
        });
      })
      .catch((err) => console.log('error : ', err));
  };

  render() {
    return (
      <View>
        {this.state.scanning ? (
          this.state.hasPermission === false ? (
            <Text>No access to camera</Text>
          ) : (
            <Camera
              style={{ width: 300, height: 400 }}
              type={this.state.type}
              ref={(ref) => {
                this.camera = ref;
              }}
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                }}
              >
                <TouchableOpacity
                  style={{
                    flex: 1,
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                  }}
                  onPress={this.setSnap}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      marginBottom: 5,
                      color: 'white',
                      backgroundColor: 'black',
                    }}
                  >
                    SNAP
                  </Text>
                </TouchableOpacity>
              </View>
            </Camera>
          )
        ) : (
          <>
            <Button transparent onPress={() => this.setScanning(true)}>
              <Icon name='scan1' size={24} />
            </Button>
            {this.state.uri === '' ? (
              <></>
            ) : (
              <Image
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: 'contain',
                }}
                source={{ uri: this.state.uri }}
              />
            )}
          </>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

// {
//   "error": {
//     "code": 3,
//     "message": "Invalid argument: Bad image data."
//   },
//   "labelAnnotations": [
//     {
//       "description": "Bottle",
//       "mid": "/m/04dr76w",
//       "score": 0.95155406,
//       "topicality": 0.95155406
//     },
//     {
//       "description": "Wine bottle",
//       "mid": "/m/020p1v",
//       "score": 0.93839025,
//       "topicality": 0.93839025
//     },
//     {
//       "description": "Glass bottle",
//       "mid": "/m/089mxq",
//       "score": 0.930504,
//       "topicality": 0.930504
//     },
//     {
//       "description": "Alcoholic beverage",
//       "mid": "/m/012mj",
//       "score": 0.7814502,
//       "topicality": 0.7814502
//     },
//     {
//       "description": "Liqueur",
//       "mid": "/m/04qgp",
//       "score": 0.76093227,
//       "topicality": 0.76093227
//     },
//     {
//       "description": "Wine",
//       "mid": "/m/081qc",
//       "score": 0.74097455,
//       "topicality": 0.74097455
//     },
//     {
//       "description": "Distilled beverage",
//       "mid": "/m/04shl0",
//       "score": 0.7113863,
//       "topicality": 0.7113863
//     },
//   ],
//   "textAnnotations": [
//     {
//       "boundingPoly": {
//         "vertices": [
//           {
//             "x": 59,
//             "y": 234
//           },
//           {
//             "x": 1415,
//             "y": 234
//           },
//           {
//             "x": 1415,
//             "y": 1751
//           },
//           {
//             "x": 59,
//             "y": 1751
//           }
//         ]
//       },
//       "description": "WALTER HANSEI\nHansel Family Vineyards\nRUSSIAN RIVER VALLET\nThe North Slope Vineyard\nWON, PRODUCED AND BOTTLED BY WALTER HANSEL WINERY\nSANTA ROSA, CA • ALCOHOL 14.5% BY VOLUME\n2017\nPinot Noir\n",
//       "locale": "en"
//     },
//   ]
// }
