// In App.js in a new project

import * as React from 'react';
import {Provider} from 'react-redux';
import {AuthNavigator} from './Navigation/AuthNavigator';
import {persistor, store} from '../src/Redux/store/store';
import {PersistGate} from 'redux-persist/integration/react';

function App() {
  console.disableYellowBox = true;
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthNavigator />
      </PersistGate>
    </Provider>
  );
}

export default App;
