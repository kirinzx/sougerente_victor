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
  const [user, SetUser] = useState('');
  const [senha, SetSenha] = useState('');
  const [usuario, SetUsuario] = useState({});
  const [hide, SetHide] = useState(true);

  const getUser = async () => {
    const { data } = await axios.get(`http://192.168.1.6/8LIGHT/api_sougerente/index.php/load_usuario_login?p1=${user}&p2=${senha}`);
    SetUsuario(data[0]);
    alert(usuario.nome_completo)
    alert(usuario.cpf);
  };




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
          onChangeText={SetUser}
        />

        <Text style={stilos.tituloSenha}>Senha</Text>
        <TextInput
          style={stilos.placeholder}
          secureTextEntry={hide}
          placeholder="Senha"
          autoCorrect={false}
          onChangeText={SetSenha}
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
});
