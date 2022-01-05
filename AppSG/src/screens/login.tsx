import React, { useState } from 'react';
import { Platform, StyleSheet, Text, KeyboardAvoidingView, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import { Block, Button } from '../components';
import axios from 'axios';
import { useData, useTheme, useTranslation } from '../hooks';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';


const isAndroid = Platform.OS === 'android';



const Profile = () => {
  const navigation = useNavigation();
  const { assets, colors, sizes } = useTheme();
  const [Nome, SetNome] = useState({});





  return (
    <KeyboardAvoidingView style={stilos.background}>
      <View style={stilos.logoContainer}>
        <Image
          style={stilos.logo}
          source={require('../assets/images/sougerente.png')}
          resizeMode='contain'
        />
      </View>

      <View style={stilos.container}>
        <TextInput
          placeholder="Email"
          autoCorrect={false}
          onChangeText={() => { }}
        />

        <TextInput
          placeholder="Senha"
          autoCorrect={false}
          onChangeText={() => { }}
        />

        <TouchableOpacity>
          <Text>Entrar</Text>
        </TouchableOpacity>

      </View>
    </KeyboardAvoidingView>

  );
};

export default Profile;


const stilos = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CB8D00',

  },

  shadowProp: {
    shadowColor: '#757575',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
  },

  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    width: '100%',
  },

  logo: {
    width: 450,
    height: 450,
    marginLeft: '-10%'
  },

  container: {
    backgroundColor: '#CB8D00',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',

  },

});
