import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, Text, Image, View, TouchableHighlight } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useTheme } from '../navigation/hooks/';
import axios from 'axios';
import { Block, Button } from '../components/';
import Modal from 'react-native-modal';


let usus = [];


const HomeADM = () => {
  const { assets, colors, fonts, gradients, sizes } = useTheme();
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [isModalVisible, setModalVisible] = useState(true);

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
          <TouchableOpacity onPress={() => navigation.navigate('ProfileADM')} style={stilos.tcBlock}>
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
      <Modal isVisible={isModalVisible} style={stilos.modal}>
        <View style={stilos.modalContent}>

          <View style={stilos.vwTitulos}>
            <Text style={stilos.tituloAuth}>Autenticação</Text>
          </View>

          <View style={stilos.vwEstrelas}>
            <Text style={stilos.txtDescricao}>Gostaria de usar Autenticação Biométrica</Text>
            <Text style={stilos.txtDescricao}>para realizar login?</Text>
            <Text style={stilos.txtBonus}>*( Autenticação Facial/Digital )</Text>
          </View>

          <Image
            source={require('../assets/images/digital.png')}
            style={stilos.imgDigital}
          />

          <View style={stilos.vwBtn}>
            <TouchableOpacity style={stilos.btnConfirmar}>
              <Text style={stilos.txtAceitar}>Sim</Text>
            </TouchableOpacity>

            <View style={{ width: 10 }}></View>

            <TouchableOpacity style={stilos.btnRecusar} onPress={() => setModalVisible(false)}>
              <Text style={stilos.txtRecusar}>Não, Obrigado</Text>
            </TouchableOpacity>

          </View>

        </View>
      </Modal>
    </Block>
  );
};

export default HomeADM;

const stilos = StyleSheet.create({

  card: {
    backgroundColor: ('#CB8D00'),
    borderRadius: 15,
    height: '25%',
    marginTop: '30%',
    shadowColor: ('#757575'),
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
  },

  card2: {
    backgroundColor: ('#CB8D00'),
    borderRadius: 15,
    height: '30%',
    marginTop: '-20%',
    shadowColor: ('#757575'),
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
    color: ('white'),
    marginTop: '6%',
    marginLeft: '5%'
  },

  bemvindo: {
    color: ('#CB8D00'),
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'OpenSans-ExtraBold',
  },

  tcBlock: {
    height: '100%',
    width: '100%',
  },

  modal: {
    justifyContent: 'center',
    margin: 20,
  },

  modalContent: {
    backgroundColor: 'white',
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    height: '50%',
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,
  },


  vwTitulos: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '-70%',
  },

  vwEstrelas: {
    marginTop: 30,
  },

  vwBtn: {
    width: 500,
    height: '25%',
    flexDirection: 'row-reverse',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '-80%',
    marginTop: '5%',
  },

  btnConfirmar: {
    backgroundColor: '#39AF31',
    width: '100%',
    height: '30%',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginRight: '15%',
    marginBottom: 15,
  },

  btnRecusar: {
    backgroundColor: 'red',
    width: '100%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 20,
    marginRight: '5%',
    marginBottom: 15,
  },

  txtAceitar: {
    fontFamily: 'OpenSans-ExtraBold',
    fontSize: 20,
    color: 'white',
  },

  txtRecusar: {
    fontFamily: 'OpenSans-ExtraBold',
    fontSize: 20,
    color: 'white',
  },

  imgDigital: {
    height: 90,
    width: 90,
    marginTop: '10%',
  },

  txtDescricao: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
    marginLeft: 5,
    marginRight: 5,
  },

  txtBonus: {
    textAlign: 'center',
    alignContent: 'center',
    fontFamily: 'OpenSans-Regular',
    fontSize: 15,
    marginTop: 10,
  },

  tituloAuth: {
    fontSize: 22,
    fontFamily: 'OpenSans-ExtraBold',
  },


});


