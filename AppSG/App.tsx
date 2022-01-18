import 'react-native-gesture-handler';
import React from 'react';

import {DataProvider} from './src/navigation/hooks';
import AppNavigation from './src/navigation/App';

export default function App() {
  return (
    <DataProvider>
      <AppNavigation />
    </DataProvider>
  );
}
