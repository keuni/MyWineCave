import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Index from './components/index';
import { AppRegistry } from 'react-native';
import rootReducer from './reducers';
import BottomTab from './components/BottomTab';

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      {/* <Index /> */}
      <BottomTab />
    </Provider>
  );
}

AppRegistry.registerComponent('MYWINE', () => App);
