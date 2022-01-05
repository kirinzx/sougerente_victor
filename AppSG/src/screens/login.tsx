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
          style={stilos.placeholder}
          placeholder="Email"
          autoCorrect={false}
          onChangeText={() => { }}
        />

        <TextInput
          style={stilos.placeholder}
          placeholder="Senha"
          autoCorrect={false}
          onChangeText={() => { }}
        />

        <TouchableOpacity style={stilos.btnEntrar}>
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
    backgroundColor: 'white',

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
    width: '100%',
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
  },

  placeholder: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'OpenSans-Bold',
    marginTop: '8%',
  },

  btnEntrar: {
    backgroundColor: 'white',
    width: 70,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    marginTop: '10%',


  },

});
