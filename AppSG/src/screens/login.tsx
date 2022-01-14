import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, Text, KeyboardAvoidingView, View, Image, TouchableOpacity, AsyncStorageStatic } from 'react-native';




import axios from 'axios';
import { TextInput } from 'react-native-gesture-handler';
import { NavigationContext, NavigationHelpersContext, StackActions, StackRouter, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

let usuarium = [{}];
const isAndroid = Platform.OS === 'android';



const Profile = () => {
  const [user, SetUser] = useState('');
  const [senha, SetSenha] = useState('');
  const [hide, SetHide] = useState(true);
  const navigation = useNavigation();

  const getUser = () => {

    usuarium.splice(0, 1);
    loadAPI('load_usuario_login', [user, senha]).then((result) => {
      for (const dado of result) {
        usuarium.push(dado)
      }

      if (usuarium[0].idusuario == 9) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'HomeADM' }]
        })
        AsyncStorage.setItem('iduser', usuarium[0].idusuario)
        AsyncStorage.getItem('iduser').then((valor) => console.log(valor))

      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'HomeGerente' }]
        })
        AsyncStorage.clear()
        AsyncStorage.setItem('iduser', usuarium[0].idusuario)
        AsyncStorage.getItem('iduser').then((valor) => console.log(valor))
      }

      //console.log(usuarium[0].email);

    });

  };

  async function loadAPI(api, param) {
    let newp = '';
    if (param) {
      if (param.length != 0) {
        for (let x = 0; x < param.length; x++) newp += `p${x + 1}=${param[x]}&`;
      }
    }
    newp = newp.slice(0, newp.length - 1);

    const { data } = await axios.get(
      `http://192.168.1.6/8LIGHT/api_sougerente/index.php/${api}?${newp}`,
    );

    return data;
  }




  return (
    <KeyboardAvoidingView style={stilos.background}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      <View style={stilos.logoContainer}>
        <Image
          style={stilos.logo}
          source={require('../assets/images/sougerente.png')}
          resizeMode='contain'
        />
      </View>



      <View style={stilos.container}>
        <Text style={stilos.welcome}>BEM-VINDO</Text>
        <Text style={stilos.tituloUser}>Usuário</Text>
        <TextInput
          style={stilos.placeholder}
          placeholder="Entre usando CPF, Email ou Telefone"
          autoCorrect={false}
          onChangeText={value => SetUser(value)}
        />

        <Text style={stilos.tituloSenha}>Senha</Text>
        <TextInput
          style={stilos.placeholder}
          secureTextEntry={hide}
          placeholder="Senha"
          autoCorrect={false}
          onChangeText={value => SetSenha(value)}
        />
        <TouchableOpacity onPress={() => SetHide(!hide)} style={{ marginLeft: '70%' }}>
          <Image
            style={stilos.eye}
            source={require('../assets/images/olho.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={stilos.password}>Esqueci a Senha</Text>
        </TouchableOpacity>


        <TouchableOpacity style={stilos.btnEntrar} onPress={getUser}>
          <Text style={stilos.entrar}
          >ENTRAR</Text>
        </TouchableOpacity>

      </View>
    </KeyboardAvoidingView >

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
    marginTop: '-5%'
  },
});
