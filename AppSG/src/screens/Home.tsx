import React, { useCallback, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, Image } from 'react-native';

import { useTheme } from '../navigation/hooks/';
import { Block } from '../components/';

const Home = () => {
  const { assets, colors, fonts, gradients, sizes } = useTheme();



  return (
    <Block marginTop={sizes.m} paddingHorizontal={sizes.padding}>
      {/* inline cards */}
      <Block row marginTop={sizes.sm}>
        <Block marginRight={sizes.sm} style={stilos.card}>
          <Image
            //resizeMode="contain"
            source={require('../assets/images/usabilidade.png')}
            style={stilos.icon}
          />
          <Text style={stilos.titulo}>
            Indicadores
          </Text>
        </Block>
        <Block marginRight={sizes.sm} style={stilos.card}>
          <Image
            //resizeMode="contain"
            source={require('../assets/images/avaliacao.png')}
            style={stilos.icon}
          />
          <Text style={stilos.titulo}>
            Tarefas
          </Text>
        </Block>
      </Block>
      <Block row marginTop={sizes.sm}>
        <Block marginRight={sizes.sm} style={stilos.card}>
          <Image
            //resizeMode="contain"
            source={require('../assets/images/aumentando.png')}
            style={stilos.icon}
          />
          <Text style={stilos.titulo}>
            Resultados
          </Text>
        </Block>
        <Block marginRight={sizes.sm} style={stilos.card}>
          <Image
            //resizeMode="contain"
            source={require('../assets/images/graficoDeBarras.png')}
            style={stilos.icon}
          />
          <Text style={stilos.titulo}>
            Dados
          </Text>
        </Block>
      </Block>
      <Block row marginTop={sizes.sm}>
        <Block marginRight={sizes.sm} style={stilos.card}>
          <Image
            //resizeMode="contain"
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
    height: '40%',
  },

  icon: {
    width: 30,
    height: 30,
    marginLeft: '8%',
    marginTop: '6%',
  },

  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'OpenSans-ExtraBold',
    color: 'white',
    marginTop: '6%',
    marginLeft: '5%'
  },

});
