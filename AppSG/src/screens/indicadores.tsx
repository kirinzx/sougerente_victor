import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, Text, Dimensions } from 'react-native';

import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CircularProgress from 'react-native-circular-progress-indicator';

import { Block, Image, Button } from '../components/';
import axios from 'axios';
import { useData, useTheme } from '../hooks/';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";


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

  const data = {
    labels: ["JAN", "FEB", "MAR", "ABR", "MAI", "JUN"],
    datasets: [
      {
        data: [10, 90, 30, 15, 50, 60],
        color: (opacity = 1) => `rgb(203, 141, 0, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ["METAS"] // optional
  };

  const screenWidth = Dimensions.get("window").width;

  const chartConfig = {
    backgroundColor: "#6a00ff",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#ffffff",
    backgroundGradientToOpacity: 0.9,
    color: (opacity = 1) => `rgb(137, 55, 0)`,
    strokeWidth: 9, // optional, default 3
    barPercentage: 0.8,
    useShadowColorFromDataset: false, // optional
  };


  return (
    <Block safe style={stilos.bck}>
      <Block
        scroll
        paddingHorizontal={sizes.s}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: sizes.padding }}>
        <Block flex={1}>
          <Block row style={stilos.bordin}>
            <CircularProgress value={28}
              activeStrokeColor={'#CB8D00'}
              inActiveStrokeOpacity={0.6}
              valueSuffix={'%'}
              title={'Metas'}
              titleStyle={{ fontFamily: 'OpenSans-Bold' }}
              titleColor={'white'}
              textColor={'white'}
            />

            <CircularProgress
              value={63}
              activeStrokeColor={'#CB8D00'}
              activeStrokeWidth={12}
              inActiveStrokeOpacity={0.6}
              valueSuffix={'%'}
              title={'Tarefas'}
              titleStyle={{ fontFamily: 'OpenSans-Bold' }}
              titleColor={'white'}
              textColor={'white'}
              duration={2000}
            //textColor={'#ecf0f1'}
            />
            <CircularProgress
              value={87}
              activeStrokeColor={'#CB8D00'}
              activeStrokeWidth={12}
              inActiveStrokeOpacity={0.6}
              valueSuffix={'%'}
              title={'Objetivos'}
              titleStyle={{ fontFamily: 'OpenSans-Bold' }}
              titleColor={'white'}
              textColor={'white'}
              duration={2000}
            //textColor={'#ecf0f1'}
            />
          </Block>
          <Block style={stilos.bordin}>

            <LineChart
              data={data}
              width={360}
              height={220}
              chartConfig={chartConfig}
              style={{ borderRadius: 40 }}
            />

          </Block>
          <Block row style={stilos.bordin}>
            <CircularProgress
              value={87}
              activeStrokeColor={'#CB8D00'}
              activeStrokeWidth={12}
              inActiveStrokeOpacity={0.6}
              valueSuffix={'%'}
              title={'Concluidas'}
              titleColor={'white'}
              textColor={'white'}
              duration={2000}
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
    backgroundColor: '#b2b2b2',
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
