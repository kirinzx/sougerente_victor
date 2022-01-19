import React, {useState, useEffect} from 'react';
import {Platform, ScrollView, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import {Feather} from '@expo/vector-icons';
import axios from 'axios';
import {useData, useTheme, useTranslation} from '../../hooks';
import LinearGradient from 'react-native-linear-gradient';

import {
  Container,
  ContainerUser,
  Foto,
  ViewInf,
  Nome,
  Email,
  ContainerTarefas,
  ContainerText,
  TextNum,
  TextDesc,
  ContainerCard,
  Title,
  ContainerInf,
  Periodo,
  Status,
  ContainerStatus,
  Background,
  Icon,
} from './styles';

const isAndroid = Platform.OS === 'android';

export default function Profile() {
  const navigation = useNavigation();
  const {assets, colors, sizes} = useTheme();
  const [user, setUser] = useState({});
  const [foto, setFoto] = useState();
  const [loading, setLoading] = useState(false);
  const [dataArr, setDataArr] = useState([{}]);
  let fotinha = '';

  let idusuario;

  async function getUser() {
    idusuario = 3; //await AsyncStorage.getItem('iduser');
    const {data} = await axios.get(
      `http://192.168.1.6/8LIGHT/api_sougerente/index.php/load_usuario?p1=${idusuario}`,
    );
    setUser(data[0]);
    setFoto(data[0].foto);
  }

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

  async function loadCard() {
    if (loading) return;
    setLoading(true);

    const {data} = await axios.get(
      `http://192.168.1.6/8LIGHT/api_sougerente/index.php/profile_tarefas?p1=${idusuario}`,
    );
    setDataArr(data);
    setLoading(false);
  }

  useEffect(() => {
    getUser();
    loadCard();
  }, []);

  return (
    !loading && (
      <>
        <Container>
          <Background></Background>
          <ContainerUser>
            <Foto source={{uri: foto}} resizeMode="cover" />
            <ViewInf>
              <Nome>Inan Brunelli Brandão</Nome>
              <Email>Administrativo</Email>
            </ViewInf>
          </ContainerUser>
          <ContainerTarefas>
            <ContainerText>
              <TextNum>10</TextNum>
              <TextDesc>Concluidas</TextDesc>
            </ContainerText>
            <ContainerText>
              <TextNum>2</TextNum>
              <TextDesc>Pendentes</TextDesc>
            </ContainerText>
            <ContainerText>
              <TextNum>3</TextNum>
              <TextDesc>Metas</TextDesc>
            </ContainerText>
          </ContainerTarefas>

          <FlatList
            showsVerticalScrollIndicator={false}
            style={{height: '100%', width: '100%', marginTop: '10%'}}
            data={dataArr}
            keyExtractor={(item) => String(item.id)}
            renderItem={({item}) => <Card data={item} />}
          />
        </Container>
      </>
    )
  );
}

function Card({data}) {
  return (
    <ContainerCard>
      <Title>{data.tarefa}</Title>
      <ContainerInf>
        <Periodo>{data.periodo}</Periodo>
        <ContainerStatus type={'Concluido'}>
          <Status>Concluido</Status>
        </ContainerStatus>
      </ContainerInf>
    </ContainerCard>
  );
}
