import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, Image, View, TouchableHighlight } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';


import { useTheme } from '../navigation/hooks/';
import { Block, Button } from '../components/';

const Home = () => {
  const { assets, colors, fonts, gradients, sizes } = useTheme();




  return (

    <Block marginTop={sizes.m} paddingHorizontal={sizes.padding}>
      <View style={{ marginTop: '13%' }}>
        <Text style={stilos.bemvindo}>Bem Vindo,</Text>
        <Text style={stilos.bemvindo}>Admin</Text>
      </View>
      <Block row marginTop={sizes.sm} style={{ marginBottom: '-50%' }}>
        <Block marginRight={sizes.sm} style={stilos.card}>
          <Image
            source={require('../assets/images/usabilidade.png')}
            style={stilos.icon}
          />
          <Text style={stilos.titulo}>
            Indicadores
          </Text>
        </Block>
        <Block marginRight={sizes.sm} style={stilos.card}>
          <Image
            source={require('../assets/images/avaliacao.png')}
            style={stilos.icon}
          />
          <Text style={stilos.titulo}>
            Tarefas
          </Text>
        </Block>
      </Block>
      <Block row>
        <Block marginRight={sizes.sm} style={stilos.card}>
          <Image
            source={require('../assets/images/aumentando.png')}
            style={stilos.icon}
          />
          <Text style={stilos.titulo}>
            Resultados
          </Text>
        </Block>
        <Block marginRight={sizes.sm} style={stilos.card}>
          <Image
            source={require('../assets/images/graficoDeBarras.png')}
            style={stilos.icon}
          />
          <Text style={stilos.titulo}>
            Dados
          </Text>
        </Block>
      </Block>
      <Block row>
        <Block marginRight={sizes.sm} style={stilos.card2}>
          <Image
            source={require('../assets/images/organograma.png')}
            style={stilos.icon}
          />
          <Text style={stilos.titulo}>
            Organograma
          </Text>
        </Block>
        <Block marginRight={sizes.sm}>
        </Block>
      </Block>
    </Block>
  );
};

export default Home;

const stilos = StyleSheet.create({

  card: {
    backgroundColor: '#CB8D00',
    borderRadius: 15,
    height: '30%',
    marginTop: '30%',
    shadowColor: '#757575',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
  },

  card2: {
    backgroundColor: '#CB8D00',
    borderRadius: 15,
    height: '30%',
    marginTop: '-20%',
    shadowColor: '#757575',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
  },

  icon: {
    width: 30,
    height: 30,
    marginLeft: '8%',
    marginTop: '6%',
  },

  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'OpenSans-ExtraBold',
    color: 'white',
    marginTop: '6%',
    marginLeft: '5%'
  },

  bemvindo: {
    color: '#CB8D00',
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'OpenSans-ExtraBold',
  },

});
