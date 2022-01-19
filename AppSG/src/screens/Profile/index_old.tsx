import React, {useState, useEffect} from 'react';
import {Platform, StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import {Feather} from '@expo/vector-icons';

import {Block, Image, Button} from '../../components';
import axios from 'axios';
import {useData, useTheme, useTranslation} from '../../hooks';

import {Card} from './styles';

const isAndroid = Platform.OS === 'android';

const Profile = () => {
  const navigation = useNavigation();
  const {assets, colors, sizes} = useTheme();
  const [user, setUser] = useState({});
  const [foto, setFoto] = useState();

  async function getUser() {
    var user = await AsyncStorage.getItem('iduser');
    const {data} = await axios.get(
      `http://192.168.1.6/8LIGHT/api_sougerente/index.php/load_usuario?p1=${user}`,
    );
    setUser(data[0]);
    setFoto(data[0].foto);
  }

  let fotinha = '';
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 0.3,
    });

    if (!result.cancelled) {
      fotinha = result;
      uploadImage();
    } else {
      return;
    }
  };

  async function uploadImage() {
    var iduser = await AsyncStorage.getItem('iduser');

    let nome = '';
    await loadAPI('profile_usuario', [iduser]).then((result) => {
      nome = result[0].nome_completo.slice(
        0,
        result[0].nome_completo.indexOf(' '),
      );
    });

    const path = fotinha.uri.split('/');
    const data = new FormData();
    data.append('arquivo', {
      name: `${nome}.jpg`,
      uri: fotinha.uri,
      type: fotinha.type,
    });

    await axios.post(
      'http://192.168.1.6/8LIGHT/api_goauditt/sg_fotos.php',
      data,
    );

    setFoto(fotinha.uri);
  }

  async function loadAPI(api, param) {
    let newp = '';
    if (param) {
      if (param.length != 0) {
        for (let x = 0; x < param.length; x++) newp += `p${x + 1}=${param[x]}&`;
      }
    }
    newp = newp.slice(0, newp.length - 1);

    const {data} = await axios.get(
      `http://192.168.1.6/8LIGHT/api_sougerente/index.php/${api}?${newp}`,
    );

    return data;
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Block safe marginTop={sizes.md} scroll>
      <Block
        scroll
        paddingHorizontal={sizes.s}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: sizes.padding}}>
        <Image
          background
          resizeMode="cover"
          padding={sizes.sm}
          radius={sizes.cardRadius}
          source={require('../../assets/images/card.png')}>
          <Button
            row
            flex={0}
            justify="flex-start"
            onPress={() => navigation.goBack()}>
            <Image
              radius={0}
              width={10}
              height={18}
              color={'white'}
              source={assets.arrow}
              transform={[{rotate: '180deg'}]}
            />
            <Text style={stilos.textVoltar}>Voltar</Text>
          </Button>
          <Block flex={1} align="center">
            <Image width={120} height={120} source={{uri: foto}} />
            <Feather
              onPress={pickImage}
              size={20}
              name="edit"
              style={{
                color: 'white',
                position: 'absolute',
                left: '75%',
                borderWidth: 2,
                borderColor: 'white',
                padding: 5,
                borderRadius: 5,
              }}
            />
            <Text style={stilos.nomePerfil}>{user.nome_completo}</Text>
            <Text style={stilos.tituloPerfil}>{user.email}</Text>
            <Block row marginVertical={sizes.m}></Block>
          </Block>
        </Image>

        {/* profile: stats */}
        <Block
          flex={1}
          scroll
          radius={sizes.sm}
          shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
          marginTop={-sizes.l}
          marginHorizontal="6%"
          color="rgb(153, 153, 153)">
          <Block
            row
            blur
            flex={0}
            intensity={100}
            radius={sizes.sm}
            overflow="hidden"
            tint={colors.blurTint}
            justify="space-evenly"
            paddingVertical={sizes.sm}
            renderToHardwareTextureAndroid>
            <Block align="center">
              <Text style={stilos.numberPerfil}> 10</Text>
              <Text style={stilos.numberText}> Concluídas</Text>
            </Block>
            <Block align="center">
              <Text style={stilos.numberPerfil}>2</Text>
              <Text style={stilos.numberText}>Pendente</Text>
            </Block>
            <Block align="center">
              <Text style={stilos.numberPerfil}>3</Text>
              <Text style={stilos.numberText}>Metas</Text>
            </Block>
          </Block>
        </Block>

        <Block
          flex={0}
          radius={sizes.sm}
          marginTop={sizes.l}
          marginHorizontal="5%"
          color="#CB8D00"
          style={stilos.shadowProp}>
          <Block align="center" style={stilos.task}>
            <Text style={stilos.titleTask}> Checar Geladeiras </Text>
          </Block>
          <Block
            row
            flex={0}
            intensity={10}
            radius={sizes.sm}
            overflow="hidden"
            tint={colors.blurTint}
            justify="space-evenly"
            paddingVertical={sizes.sm}
            renderToHardwareTextureAndroid>
            <Block align="center" style={stilos.textEsquerda}>
              <Text style={stilos.textRnd}>Diária</Text>
            </Block>
            <Block align="center" style={stilos.textConcluido}>
              <Text style={stilos.textRnd}>Concluída</Text>
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default Profile;

const stilos = StyleSheet.create({
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
    shadowOffset: {width: 1, height: 3},
    shadowOpacity: 0.7,
    shadowRadius: 4,
  },
});
