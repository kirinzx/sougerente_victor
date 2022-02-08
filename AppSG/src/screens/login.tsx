import React, { useState, useEffect } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  View,
  Image,
  TouchableOpacity,
  AsyncStorageStatic,
  Modal,
  Alert
} from 'react-native';

import { loadAPI } from '../global/Funcoes';
import axios from 'axios';
import { TextInput } from 'react-native-gesture-handler';
import {
  NavigationContext,
  NavigationHelpersContext,
  StackActions,
  StackRouter,
  useNavigation,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ModalAlert } from '../components/ModalAlert';
import * as LocalAuthentication from 'expo-local-authentication';

let cpf = false;
let usuarium = [{}];
const isAndroid = Platform.OS === 'android';

const Profile = () => {
  const [user, SetUser] = useState('');
  const [senha, SetSenha] = useState('');
  const [hide, SetHide] = useState(true);
  const [modal, SetModal] = useState(false);
  const [msg, setMsg] = useState('');
  const navigation = useNavigation();


  const [isModalVisible, setIsModalVisible] = useState(true);


  async function authenticate() {
    const hasPassword = await LocalAuthentication.isEnrolledAsync();

    if (!hasPassword) return;

    const { success, error } = await LocalAuthentication.authenticateAsync();

    if (success) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'HomeADM' }],
      });
      Alert.alert('Autenticado com sucesso!');
      AsyncStorage.getItem('iduser').then((valor) => console.log(valor));
    } else {
      Alert.alert('Login Invalido, por favor tente novamente!');
    }
    setIsModalVisible(false);
  }

  Platform.OS === 'ios' && authenticate();


  async function getUser() {
    usuarium.splice(0, 1);

    if (!user || !senha) {
      setMsg('Digite todos os campos antes de continuar!');
      SetModal(true);
      setTimeout(() => {
        SetModal(false);
      }, 2500);
      return;
    }

    await loadAPI('load_usuario_login', [user, senha]).then((result) => {
      for (const dado of result) {
        usuarium.push(dado);
      }

      if (usuarium[0].quantidade || usuarium[0].senha != usuarium[0].md5) {
        setMsg('Usuário ou senha incorreto!');
        SetModal(true);
        setTimeout(() => {
          SetModal(false);
        }, 2500);
        return;
      }
      if (usuarium[0].idfuncao == 5) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'HomeADM' }],
        });
        AsyncStorage.setItem('iduser', usuarium[0].idusuario);
        AsyncStorage.getItem('iduser').then((valor) => console.log(valor));
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'HomeGerente' }],
        });
        AsyncStorage.clear();
        AsyncStorage.setItem('iduser', usuarium[0].idusuario);
        AsyncStorage.getItem('iduser').then((valor) => console.log(valor));
      }

      //console.log(usuarium[0].email);
    });


  };


  return (
    <>
      <ModalAlert visible={modal} icon={'x-circle'} msg={msg} />

      <KeyboardAvoidingView
        style={stilos.background}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}>
        <View style={stilos.logoContainer}>
          <Image
            style={stilos.logo}
            source={require('../assets/images/sougerente.png')}
            resizeMode="contain"
          />
        </View>

        <View style={stilos.container}>
          <Text style={stilos.welcome}>BEM-VINDO</Text>
          <Text style={stilos.tituloUser}>Usuário</Text>
          <TextInput
            style={stilos.placeholder}
            placeholder="Entre usando CPF, Email ou Telefone"
            autoCorrect={false}
            onChangeText={(valor) => SetUser(valor)}
            value={user}
          />

          <Text style={stilos.tituloSenha}>Senha</Text>
          <TextInput
            style={stilos.placeholder}
            secureTextEntry={hide}
            placeholder="Senha"
            autoCorrect={false}
            onChangeText={(value) => SetSenha(value)}
          />
          <TouchableOpacity
            onPress={() => SetHide(!hide)}
            style={{ marginLeft: '70%' }}>
            <Image
              style={stilos.eye}
              source={require('../assets/images/olho.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={stilos.password}>Esqueci a Senha</Text>
          </TouchableOpacity>

          <TouchableOpacity style={stilos.btnEntrar} onPress={getUser}>
            <Text style={stilos.entrar}>ENTRAR</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {Platform.OS === 'android' && (
        <Modal
          animationType='slide'
          transparent={true}
          visible={isModalVisible}
          onShow={authenticate}
        >
        </Modal>
      )}

    </>
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
    marginLeft: '-10%',
  },

  eye: {
    width: 25,
    height: 25,
  },

  container: {
    backgroundColor: '#CB8D00',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    overflow: 'hidden',
  },

  placeholder: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'OpenSans-Bold',
    marginTop: '4%',
    borderBottomWidth: 1,
    borderColor: 'black',
    width: '80%',
    marginBottom: '4%',
  },

  btnEntrar: {
    backgroundColor: '#EEA500',
    width: 100,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    marginTop: '10%',
    borderWidth: 1,
    borderColor: '#707070',
  },

  tituloSenha: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'OpenSans-ExtraBold',
    alignContent: 'center',
    alignItems: 'center',
    marginRight: '67%',
  },

  tituloUser: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'OpenSans-ExtraBold',
    alignContent: 'center',
    alignItems: 'center',
    marginRight: '64%',
    marginTop: '10%',
  },

  welcome: {
    color: 'white',
    fontSize: 23,
    fontWeight: 'bold',
    fontFamily: 'OpenSans-ExtraBold',
    marginTop: '-3%',
    marginRight: '52%',
  },

  entrar: {
    color: 'white',
    fontSize: 22,
    fontFamily: 'OpenSans-Bold',
    fontWeight: 'bold',
  },

  password: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'OpenSans-Bold',
    fontWeight: 'bold',
    marginRight: '55%',
    marginTop: '-8%',
  },

  olhinho: {
    borderWidth: 1,
    borderColor: 'black',
    width: '68%',
    marginRight: '15%',
    marginTop: '-5%',
  },

  modal: {
    backgroundColor: '#333',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: '40%',
  },

  cancelText: {
    color: 'red',
    fontSize: 16,
  },

  authText: {
    color: 'white',
    fontSize: 16,
  },
});
