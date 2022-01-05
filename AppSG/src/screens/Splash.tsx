import React from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import * as Animatable from 'react-native-animatable';

export function Splash() {
  return (
    <View style={stilo.container}>
      <Animatable.Image
        style={stilo.imgLogo}
        animation="pulse"
        iterationCount={Infinity}
        useNativeDriver
        source={require('../../assets/splash.png')}></Animatable.Image>
      <Image
        style={stilo.imgEscrita}
        source={require('../../assets/splash_escrita.png')}></Image>
    </View>
  );
}

const stilo = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgLogo: {
    height: 200,
    width: 250,
  },
  imgEscrita: {
    height: 80,
    width: 200,
    position: 'absolute',
    bottom: 0,
  },
});
