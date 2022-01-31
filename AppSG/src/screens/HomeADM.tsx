import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, Text, Image, View, TouchableHighlight } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useTheme } from '../navigation/hooks/';
import axios from 'axios';
import { Block, Button } from '../components/';


let usus = [];


const HomeADM = () => {
  const { assets, colors, fonts, gradients, sizes } = useTheme();
  const navigation = useNavigation();
  const [nome, setNome] = useState('');

  async function getUser() {
    var user = await AsyncStorage.getItem('iduser');
    const { data } = await axios.get(`http://192.168.1.6/8LIGHT/api_sougerente/index.php/load_nome_home?p1=${user}`);
    setNome(data[0]);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (

    <Block marginTop={sizes.m} paddingHorizontal={sizes.padding}>
      <View style={{ marginTop: '13%' }}>
        <Text style={stilos.bemvindo}>Bem Vindo,</Text>
        <Text style={stilos.bemvindo}>{nome.nome_completo}</Text>
      </View>
      <Block row marginTop={sizes.sm} style={{ marginBottom: '-70%' }}>
        <Block marginRight={sizes.sm} style={stilos.card}>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={stilos.tcBlock}>
            <Image
              source={require('../assets/images/usuario.png')}
              style={stilos.icon}
            />
            <Text style={stilos.titulo}>
              Perfil
            </Text>
          </TouchableOpacity>

        </Block>
        <Block marginRight={sizes.sm} style={stilos.card}>
          <TouchableOpacity style={stilos.tcBlock} onPress={() => navigation.navigate('TarefasAdmin')}>
            <Image
              source={require('../assets/images/avaliacao.png')}
              style={stilos.icon}
            />
            <Text style={stilos.titulo}>
              Tarefas
            </Text>
          </TouchableOpacity>
        </Block>
      </Block>
      <Block row style={{ marginBottom: '-70%' }}>
        <Block marginRight={sizes.sm} style={stilos.card} >
          <TouchableOpacity style={stilos.tcBlock} onPress={() => navigation.navigate('Indicadores')}>
            <Image
              source={require('../assets/images/usabilidade.png')}
              style={stilos.icon}
            />
            <Text style={stilos.titulo}>
              Indicadores
            </Text>
          </TouchableOpacity>

        </Block>
        <Block marginRight={sizes.sm}>
        </Block>
      </Block>
      <Block row>
        <Block marginRight={sizes.sm}>
        </Block>
        <Block marginRight={sizes.sm}>
        </Block>
      </Block>

    </Block>
  );
};

export default HomeADM;

const stilos = StyleSheet.create({

  card: {
    backgroundColor: '#CB8D00',
    borderRadius: 15,
    height: '25%',
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

  tcBlock: {
    height: '100%',

  },

});


