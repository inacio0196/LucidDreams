import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { MenuProvider } from 'react-native-popup-menu';

import Routes from './src/routes';
import { store, persistedStore } from './src/store';

export default function App () {  
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate persistor={persistedStore}>
          <MenuProvider>
            <Routes />
          </MenuProvider>
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
}