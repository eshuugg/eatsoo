import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
// import {store,persistor} from './redux/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import store, {persistor} from './src/redux/store';
import {AuthProvider} from './src/context/AuthContext';
import Navigation from './src/navigation/Navigation';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {/* <AuthProvider> */}
            <Navigation />
          {/* </AuthProvider> */}
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
