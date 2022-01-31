import React, { useState, useEffect, useRef } from 'react';
import { Camera } from 'expo-camera';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import {
  Text,
  Image as ReactImage,
  View,
  TouchableOpacity,
  Modal,
  Pressable,
  FlatList,
  StatusBar,
  StyleSheet,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { CardTarefa } from '../components/CardTarefa';
import { Block, Image, Button } from '../components';
import { useTheme } from '../navigation/hooks';
import axios from 'axios';
import stilos from './stilos/TarefasGerente';

export default function TarefasGerente() {
  const [canLoad, setCanLoad] = useState(false);
  const [modalPic, setModalPic] = useState(false);
  const { sizes, assets } = useTheme();
  const navigation = useNavigation();
  //const [fotinha, setFotinha] = useState();

  let fotinha = '';

  let dadosTerefa = [{}];
  useEffect(() => {
    (async () => {
      await loadTarefas();
    })();
  });

  async function loadTarefas() {
    await loadAPI('tarefasgerente_tarefas', []).then((result) => {
      dadosTerefa.splice(0, dadosTerefa.length);
      for (const dado of result) {
        dadosTerefa.push(dado);

        if (dadosTerefa.length == result.length) {
          setCanLoad(true);
        }
      }
    });
  }

  function closeCamera() {
    setModalPic(false);
  }

  async function uploadImage() {
    const path = fotinha.uri.split('/');
    const nome = path[path.length - 1];
    const data2 = new FormData();
    data2.append('arquivo', {
      name: nome,
      uri: fotinha.uri,
      type: fotinha.type,
    });
    console.log(data2);
    await axios.post(
      'http://192.168.1.6/8LIGHT/api_goauditt/sg_fotos.php',
      data2,
    );
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
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
    <>
      {canLoad && (
        <Block safe style={stilos.page}>
          <Block
            paddingHorizontal={sizes.s}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: sizes.padding }}
            marginTop={20}
          >
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
                transform={[{ rotate: '180deg' }]}
              />
              <Text style={stilos.textVoltar}>Voltar</Text>
            </Button>
            <FlatList
              data={dadosTerefa}
              renderItem={({ item }) => (
                <CardTarefa
                  dados={item}
                  openCamera={pickImage}
                  loadTarefas={loadTarefas}
                />
              )}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
            />
          </Block>
        </Block>
      )}
    </>
  );
}