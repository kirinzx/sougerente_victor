import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Home, Profile } from '../screens';

import { useScreenOptions, useTranslation } from './hooks';
import TarefasAdmin from '../screens/TarefasAdmin';
import TarefasGerente from '../screens/TarefasGerente';
import HomeGerente from '../screens/HomeGerente';
import Login from '../screens/login';

const Stack = createStackNavigator();

export default () => {
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions.stack}>

      <Stack.Screen
        name="login"
        component={Login}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="HomeGerente"
        component={HomeGerente}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="TarefasAdmin"
        component={TarefasAdmin}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  );
};
