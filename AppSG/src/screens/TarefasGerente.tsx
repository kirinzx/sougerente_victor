import React, { useState, useEffect, useRef } from 'react';
import { Camera } from 'expo-camera';
import { Feather } from '@expo/vector-icons';

import {
  Image as ReactImage,
  View,
  TouchableOpacity,
  Modal,
  Pressable,
  FlatList,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { CardTarefa } from '../components/CardTarefa';
import { Block, Image } from '../components';
import { useTheme } from '../navigation/hooks';
import axios from 'axios';
import stilos from './stilos/TarefasGerente';

export default function TarefasGerente() {
  const [canLoad, setCanLoad] = useState(false);
  const [modalPic, setModalPic] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [displayCamera, setDisplayCamera] = useState('none');
  const [hasPermission, setHasPermission] = useState(false);
  const [typeCamera, setTypeCamera] = useState(Camera.Constants.Type.front);
  const camRef = useRef(null);
  const { sizes } = useTheme();
  const [statusBar, setStatusBar] = useState(false);

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

  function handleCamera() {
    /*     (async () => {
      const {status} = await Camera.requestPermissionsAsync();
      setHasPermission(status == 'granted');
    })(); */
    let newDisplay = displayCamera == 'none' ? 'inline-block' : 'none';
    setDisplayCamera(newDisplay);
  }

  function openCamera() {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      await setHasPermission(status == 'granted');
      setDisplayCamera('inline-block');
      setStatusBar(true);
    })();
  }

  function closeCamera() {
    setStatusBar(false);
    setDisplayCamera('none');
    setCapturedPhoto(null);
  }

  function swapCamera() {
    setTypeCamera(
      typeCamera === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back,
    );
  }

  async function takePicture() {
    if (camRef) {
      const data = await camRef.current.takePictureAsync();
      setCapturedPhoto(data.uri);
      setModalPic(true);
    }
  }

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

  async function savePicture() {
    /* const assets = await MediaLibrary.createAssetAsync(capturedPhoto).then(
      () => {
        alert('salvo com sucesso papai');
      },
    ); */
    /*     const form = new FormData();
    console.log(capturedPhoto);
    let nameimage = capturedPhoto.slice(160);

    form.append('image', {
      uri: capturedPhoto,
      type: 'image/jpg',
      name: 'image.jpg',
    });

    console.log(form);

    await fetch('https://goauditt.com.br/pages/php/sg_fotos.php', {
      method: 'POST',
      body: form,
    });
    console.log('xupetoviski'); */
  }

  return (
    <>
      {canLoad && (
        <Block safe style={stilos.page}>
          <View
            style={{
              top: -20,
              width: '100%',
              height: '103.7%',
              display: displayCamera,
            }}>
            <Camera
              style={{ width: '100%', height: '100%' }}
              type={typeCamera}
              ref={camRef}></Camera>

            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <View
                style={[
                  {
                    height: 100,
                    bottom: 10,
                    width: '100%',
                    position: 'absolute',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                  },
                ]}>
                <TouchableOpacity style={stilos.swapRow} onPress={closeCamera}>
                  <ReactImage
                    style={[
                      stilos.icons,
                      { left: '25%', top: '25%', height: 30, width: 30 },
                    ]}
                    source={require('../assets/icons/botao-voltar.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={stilos.btnPic} onPress={takePicture}>
                  <View style={stilos.iconPic}></View>
                </TouchableOpacity>
                <TouchableOpacity style={stilos.swapRow} onPress={swapCamera}>
                  <ReactImage
                    style={[
                      stilos.icons,
                      { left: '25%', top: '25%', height: 30, width: 30 },
                    ]}
                    source={require('../assets/icons/troca.png')}
                  />
                </TouchableOpacity>
              </View>

              {capturedPhoto && (
                <Modal
                  animationType="slide"
                  transparent={false}
                  visible={modalPic}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        position: 'absolute',
                        bottom: 30,
                        zIndex: 1,
                        justifyContent: 'space-around',
                      }}>
                      <TouchableOpacity
                        style={[
                          stilos.iconCamera,
                          { backgroundColor: 'rgba(235, 61, 52, 0.5)' },
                        ]}
                        onPress={() => {
                          setCapturedPhoto(null);
                          setStatusBar(true);
                        }}>
                        <Feather
                          size={35}
                          name="x"
                          color={'white'}
                          style={{
                            position: 'absolute',
                            left: '20%',
                            top: '18%',
                          }}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          stilos.iconCamera,
                          { backgroundColor: 'rgba(1, 152, 117, 0.5)' },
                        ]}
                        onPress={closeCamera}>
                        <Feather
                          size={35}
                          name="check"
                          color={'white'}
                          style={{
                            position: 'absolute',
                            left: '20%',
                            top: '18%',
                          }}
                        />
                      </TouchableOpacity>
                    </View>

                    <Image
                      style={{
                        width: '100%',
                        height: '100%',
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,
                      }}
                      source={{ uri: capturedPhoto }}
                    />
                  </View>
                </Modal>
              )}
            </View>
          </View>

          <Block
            paddingHorizontal={sizes.s}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: sizes.padding }}>
            <FlatList
              data={dadosTerefa}
              renderItem={({ item }) => (
                <CardTarefa
                  dados={item}
                  openCamera={openCamera}
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
