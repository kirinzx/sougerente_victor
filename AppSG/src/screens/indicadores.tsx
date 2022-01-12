import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Text } from 'react-native-svg';

import { useNavigation } from '@react-navigation/core';
import { ProgressCircle, PieChart, AreaChart, Grid } from 'react-native-svg-charts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as shape from 'd3-shape';


import { Block, Image, Button } from '../components/';
import axios from 'axios';
import { useData, useTheme, useTranslation } from '../hooks/';


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

  const data = [
    {
      key: 1,
      amount: 50,
      svg: { fill: '#600080' },
    },
    {
      key: 2,
      amount: 50,
      svg: { fill: '#9900cc' }
    },
    {
      key: 3,
      amount: 40,
      svg: { fill: '#c61aff' }
    },
    {
      key: 4,
      amount: 95,
      svg: { fill: '#d966ff' }
    },
    {
      key: 5,
      amount: 35,
      svg: { fill: '#ecb3ff' }
    }
  ];

  const Labels = ({ slices, height, width }) => {
    return slices.map((slice, index) => {
      const { labelCentroid, pieCentroid, data } = slice;
      return (
        <Text
          key={index}
          x={pieCentroid[0]}
          y={pieCentroid[1]}
          fill={'white'}
          textAnchor={'middle'}
          alignmentBaseline={'middle'}
          fontSize={24}
          stroke={'black'}
          strokeWidth={0.2}
        >
          {data.amount}
        </Text>
      )
    })
  };

  return (
    <Block safe marginTop={sizes.md}>
      <Block
        scroll
        paddingHorizontal={sizes.s}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: sizes.padding }}>
        <Block flex={1}>
          <Block style={stilos.bordin}>
            <PieChart
              style={{ height: 200 }}
              valueAccessor={({ item }) => item.amount}
              data={data}
              spacing={0}
              outerRadius={'95%'}
            >
              <Labels />
            </PieChart>
          </Block>
          <Block style={stilos.bordin}>
            <ProgressCircle style={{ height: 200 }} progress={0.7} progressColor={'#CB8D00'} strokeWidth={10} />
          </Block>
          <Block style={stilos.bordin}>
            <Text>Teste</Text>
          </Block>
        </Block >
      </Block >

    </Block >
  );
};

export default indicadores;


const stilos = StyleSheet.create({

  bordin: {
    //borderWidth: 1,
    //borderColor: 'black',
    backgroundColor: '#d3d3d3',
    borderRadius: 40,
    marginTop: 20,
  },


  task: {
    color: 'white',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '3%',
  },

  tsktext: {
    fontWeight: 'bold',
    fontSize: 50,
    color: 'white',
  },

  textConcluido: {
    backgroundColor: '#39AF31',
    width: 10,
    height: 28,
    borderRadius: 30,
    marginRight: 10,
    borderColor: 'white',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textCentral: {
    width: 10,
    height: 28,
    borderRadius: 30,
    marginRight: 10,
    marginLeft: 0,
    borderColor: 'white',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textEsquerda: {
    width: 10,
    height: 28,
    borderRadius: 30,
    marginRight: 10,
    marginLeft: 10,
    borderColor: 'white',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textRnd: {
    fontSize: 17,
    fontFamily: 'OpenSans-Bold',
    color: 'white',
  },

  titleTask: {
    color: 'white',
    fontSize: 21,
    fontFamily: 'OpenSans-ExtraBold',
  },

  numberPerfil: {
    color: 'white',
    fontFamily: 'OpenSans-ExtraBold',
    fontSize: 25,
    marginTop: -5,
    marginBottom: 5,
    marginLeft: 5,
  },

  numberText: {
    color: 'white',
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 17,
    marginLeft: 7,
  },

  nomePerfil: {
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    fontSize: 23,
    marginTop: 8,
  },

  tituloPerfil: {
    color: 'white',
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    marginTop: 4,
  },

  textVoltar: {
    color: 'white',
    fontFamily: 'OpenSans-SemiBold',
    marginLeft: 6,
    fontSize: 18,
  },

  shadowProp: {
    shadowColor: '#757575',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
  },
});
