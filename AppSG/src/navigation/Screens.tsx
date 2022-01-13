import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Home, Profile } from '../screens';

import { useScreenOptions, useTranslation } from './hooks';
import { TarefasAdmin } from '../screens/TarefasAdmin';
import HomeGerente from '../screens/HomeGerente';
import HomeADM from '../screens/HomeADM';
import Login from '../screens/login';
import indicadores from '../screens/indicadores';
import { NavigationContext } from '@react-navigation/native';

const Stack = createStackNavigator();

export default () => {
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator>

      <Stack.Screen
        name="login"
        component={Login}
        options={{ headerShown: false, }}
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

      <Stack.Screen
        name="Indicadores"
        component={indicadores}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  );
};
