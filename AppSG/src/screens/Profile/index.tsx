import React, { useState, useEffect } from 'react';
import { Platform, ScrollView, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';
import axios from 'axios';
import { useData, useTheme, useTranslation } from '../../hooks';
import { loadAPI } from '../../global/Funcoes';
import { Image } from '../../components';

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
  ContainerFoto,
  ContainerBack,
  TitleBack,
  ButtonPhoto,
} from './styles';

const isAndroid = Platform.OS === 'android';

export default function Profile() {
  const navigation = useNavigation();
  const { assets, colors, sizes } = useTheme();
  const [user, setUser] = useState({});
  const [foto, setFoto] = useState();
  const [loading, setLoading] = useState(false);
  const [dataArr, setDataArr] = useState([{}]);
  let fotinha = '';
  let idusuario = 0;

  async function getUser() {

    idusuario = await AsyncStorage.getItem('iduser');
    const data = await loadAPI('load_usuario', [idusuario]);
    setUser(data[0]);
    setFoto(data[0].foto);
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.3,
    });

    if (!result.cancelled) {
      fotinha = result;
      Alert.alert('Confirmar seleção de imagem?', '', [
        {
          text: 'Cancelar',
        },
        { text: 'OK', onPress: () => uploadImage() },
      ]);
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

  async function loadCard() {
    idusuario = await AsyncStorage.getItem('iduser');
    if (loading) return;
    setLoading(true);
    const data = await loadAPI('profile_tarefas', [1]);
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
          <ContainerUser style={{ marginTop: 25 }}>
            <ContainerBack onPress={() => navigation.goBack()}>
              <Image
                radius={0}
                width={10}
                height={18}
                color={'white'}
                source={assets.arrow}
                transform={[{ rotate: '180deg' }]}
              />
              <TitleBack>Voltar</TitleBack>
            </ContainerBack>

            <ContainerFoto>
              <ButtonPhoto onPress={() => pickImage()}>
                <Foto source={{ uri: foto }} resizeMode="cover" />
              </ButtonPhoto>
            </ContainerFoto>
            <ViewInf>
              <Nome>{user.nome_completo}</Nome>
              <Email>{user.desc_funcao}</Email>
            </ViewInf>
          </ContainerUser>
          <ContainerTarefas style={{ marginTop: 15 }}>
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
            style={{ height: '100%', width: '100%', marginTop: '15%' }}
            data={dataArr}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => <Card data={item} />}
          />
        </Container>
      </>
    )
  );
}

function Card({ data }) {
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
