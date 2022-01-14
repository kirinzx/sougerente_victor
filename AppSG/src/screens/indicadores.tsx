import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, Text, Dimensions, Image } from 'react-native';

import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CircularProgress from 'react-native-circular-progress-indicator';

import { Block, Button } from '../components/';
import axios from 'axios';
import { useData, useTheme } from '../hooks/';
import { LineChart, Path, Grid } from 'react-native-svg-charts';
import * as shape from 'd3-shape';





const isAndroid = Platform.OS === 'android';



const indicadores = () => {
  const navigation = useNavigation();
  const { assets, colors, sizes } = useTheme();
  const [user, setUser] = useState({});

  async function getUser() {
    var user = await AsyncStorage.getItem('iduser');
    const { data } = await axios.get(`http://192.168.1.6/8LIGHT/api_sougerente/index.php/load_usuario?p1=${user}`);
    setUser(data[0]);
  };

  const props = {
    activeStrokeWidth: 25,
    inActiveStrokeWidth: 25,
    inActiveStrokeOpacity: 0.2
  };

  const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]

  const Line = ({ line }) => (
    <Path
      key={'line'}
      d={line}
      stroke={'rgb(134, 65, 244)'}
      fill={'none'}
    />
  )





  return (
    <Block safe style={stilos.bck}>
      <Block
        scroll
        paddingHorizontal={sizes.s}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: sizes.padding }}>
        <Block flex={1}>
          <Button
            row
            flex={0}
            justify="flex-start"
            onPress={() => navigation.goBack()}>
            <Image
              style={stilos.voltar}
              source={require('../assets/images/seta-branca.png')}
            />
            <Text style={stilos.textVoltar}>Voltar</Text>
          </Button>
          <Block row style={stilos.bordin}>
            <CircularProgress
              value={28}
              activeStrokeColor={'#004494'}
              inActiveStrokeColor={'#d8d2d2'}
              activeStrokeWidth={12}
              inActiveStrokeWidth={10}
              inActiveStrokeOpacity={0.6}
              valueSuffix={'%'}
              title={'Metas'}
              titleStyle={{ fontFamily: 'OpenSans-Bold' }}
              duration={2000}
            //textColor={'#ecf0f1'}
            />

            <CircularProgress
              value={63}
              activeStrokeColor={'#F5AB00'}
              inActiveStrokeColor={'#d8d2d2'}
              activeStrokeWidth={12}
              inActiveStrokeOpacity={0.6}
              valueSuffix={'%'}
              title={'Tarefas'}
              titleStyle={{ fontFamily: 'OpenSans-Bold' }}
              duration={2000}
            //textColor={'#ecf0f1'}
            />
            <CircularProgress
              value={87}
              activeStrokeColor={'#a4a4a5'}
              inActiveStrokeColor={'#d8d2d2'}
              activeStrokeWidth={12}
              inActiveStrokeOpacity={0.6}
              valueSuffix={'%'}
              title={'Objetivos'}
              titleStyle={{ fontFamily: 'OpenSans-Bold' }}
              duration={2000}
            //textColor={'#ecf0f1'}
            />
          </Block>
          <Block row style={stilos.bordin}>
            <Image
              source={require('../assets/images/loja.png')}
              style={stilos.icon}
            />

            <Text style={stilos.loja}>LOJA  1</Text>
            <Text style={stilos.titulo}>Tarefas</Text>
            <CircularProgress
              value={87}
              activeStrokeColor={'#2ecc71'}
              inActiveStrokeColor={'#d8d2d2'}
              activeStrokeWidth={12}
              inActiveStrokeOpacity={0.6}
              valueSuffix={'%'}
              title={'Concluidas'}
              duration={2000}
              titleStyle={{ fontFamily: 'OpenSans-Bold' }}

            //textColor={'#ecf0f1'}
            />
            <CircularProgress
              value={13}
              activeStrokeColor={'#ff0000'}
              inActiveStrokeColor={'#d8d2d2'}
              activeStrokeWidth={12}
              inActiveStrokeOpacity={0.6}
              valueSuffix={'%'}
              title={'Atrasadas'}
              duration={2000}
              titleStyle={{ fontFamily: 'OpenSans-Bold' }}
            //textColor={'#ecf0f1'}
            />
          </Block>
          <Block row style={stilos.bordin}>
            <Image
              source={require('../assets/images/loja.png')}
              style={stilos.icon}
            />

            <Text style={stilos.loja}>LOJA  2</Text>
            <Text style={stilos.titulo}>Tarefas</Text>
            <CircularProgress
              value={30}
              activeStrokeColor={'#2ecc71'}
              inActiveStrokeColor={'#d8d2d2'}
              activeStrokeWidth={12}
              inActiveStrokeOpacity={0.6}
              valueSuffix={'%'}
              title={'Concluidas'}
              duration={2000}
              titleStyle={{ fontFamily: 'OpenSans-Bold' }}

            //textColor={'#ecf0f1'}
            />
            <CircularProgress
              value={70}
              activeStrokeColor={'#ff0000'}
              inActiveStrokeColor={'#d8d2d2'}
              activeStrokeWidth={12}
              inActiveStrokeOpacity={0.6}
              valueSuffix={'%'}
              title={'Atrasadas'}
              duration={2000}
              titleStyle={{ fontFamily: 'OpenSans-Bold' }}
            />
          </Block>
          <Block row style={stilos.bordin}>
            <Image
              source={require('../assets/images/loja.png')}
              style={stilos.icon}
            />

            <Text style={stilos.loja}>LOJA  3</Text>
            <Text style={stilos.titulo}>Tarefas</Text>
            <CircularProgress
              value={96}
              activeStrokeColor={'#2ecc71'}
              inActiveStrokeColor={'#d8d2d2'}
              activeStrokeWidth={12}
              inActiveStrokeOpacity={0.6}
              valueSuffix={'%'}
              title={'Concluidas'}
              duration={2000}
              titleStyle={{ fontFamily: 'OpenSans-Bold' }}

            //textColor={'#ecf0f1'}
            />
            <CircularProgress
              value={4}
              activeStrokeColor={'#ff0000'}
              inActiveStrokeColor={'#d8d2d2'}
              activeStrokeWidth={12}
              inActiveStrokeOpacity={0.6}
              valueSuffix={'%'}
              title={'Atrasadas'}
              duration={2000}
              titleStyle={{ fontFamily: 'OpenSans-Bold' }}
            //textColor={'#ecf0f1'}
            />
          </Block>
          <Block row style={stilos.bordin}>
            <Image
              source={require('../assets/images/loja.png')}
              style={stilos.icon}
            />

            <Text style={stilos.loja}>LOJA  4</Text>
            <Text style={stilos.titulo}>Tarefas</Text>
            <CircularProgress
              value={61}
              activeStrokeColor={'#2ecc71'}
              inActiveStrokeColor={'#d8d2d2'}
              activeStrokeWidth={12}
              inActiveStrokeOpacity={0.6}
              valueSuffix={'%'}
              title={'Concluidas'}
              duration={2000}
              titleStyle={{ fontFamily: 'OpenSans-Bold' }}

            //textColor={'#ecf0f1'}
            />
            <CircularProgress
              value={39}
              activeStrokeColor={'#ff0000'}
              inActiveStrokeColor={'#d8d2d2'}
              activeStrokeWidth={12}
              inActiveStrokeOpacity={0.6}
              valueSuffix={'%'}
              title={'Atrasadas'}
              duration={2000}
              titleStyle={{ fontFamily: 'OpenSans-Bold' }}
            //textColor={'#ecf0f1'}
            />
          </Block>
          <Block row style={stilos.bordin}>
            <Image
              source={require('../assets/images/loja.png')}
              style={stilos.icon}
            />

            <Text style={stilos.loja}>LOJA  5</Text>
            <Text style={stilos.titulo}>Tarefas</Text>
            <CircularProgress
              value={56}
              activeStrokeColor={'#2ecc71'}
              inActiveStrokeColor={'#d8d2d2'}
              activeStrokeWidth={12}
              inActiveStrokeOpacity={0.6}
              valueSuffix={'%'}
              title={'Concluidas'}
              duration={2000}
              titleStyle={{ fontFamily: 'OpenSans-Bold' }}

            //textColor={'#ecf0f1'}
            />
            <CircularProgress
              value={44}
              activeStrokeColor={'#ff0000'}
              inActiveStrokeColor={'#d8d2d2'}
              activeStrokeWidth={12}
              inActiveStrokeOpacity={0.6}
              valueSuffix={'%'}
              title={'Atrasadas'}
              duration={2000}
              titleStyle={{ fontFamily: 'OpenSans-Bold' }}
            //textColor={'#ecf0f1'}
            />
          </Block>
        </Block >
      </Block >
    </Block >


  );
};

export default indicadores;


const stilos = StyleSheet.create({
  bck: {
    backgroundColor: '#CB8D00',
    height: '100%',
    width: '100%',

  },

  bordin: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: 20,

    shadowColor: '#757575',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
  },

  icon: {
    width: 40,
    height: 40,
    marginLeft: '3%',
    marginTop: '20%',
  },

  loja: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    marginTop: '24%',
  },

  titulo: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 24,
    marginLeft: '-23%',
    paddingRight: '4%',
  },

  shadowProp: {
    shadowColor: '#757575',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
  },

  textVoltar: {
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    marginLeft: 6,
    fontSize: 18,
  },

  voltar: {
    width: 20,
    height: 20,
    marginRight: '-2%'


  },
});
