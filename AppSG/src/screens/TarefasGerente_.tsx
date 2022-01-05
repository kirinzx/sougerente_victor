import React, {useState, useEffect, useRef, Component} from 'react';
import {Camera} from 'expo-camera';
import {
  Image as ReactImage,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Pressable,
  TextInput,
  SafeAreaView,
  FlatList,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {CardTarefa} from '../components/CardTarefa';
import {Block, Image} from '../components';
import {useTheme} from '../navigation/hooks';
import axios from 'axios';
import stilos from './stilos/TarefasGerente';

export default function TarefasGerente() {
  let obj = {
    extended: false,
    opacity: '0',
    degSeta: '270deg',
    height: 110,
  };

  const [configCard, setConfigCard] = useState(obj);
  const [valueObs, setValueObs] = useState();
  const [modalPic, setModalPic] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [displayCamera, setDisplayCamera] = useState('none');
  const [hasPermission, setHasPermission] = useState(false);
  const [typeCamera, setTypeCamera] = useState(Camera.Constants.Type.front);
  const [modalVisible, setModalVisible] = useState(false);
  const camRef = useRef(null);
  const navigation = useNavigation();
  const {assets, colors, sizes} = useTheme();

  let dadosTerefa = new Array();
  useEffect(() => {
    (async () => {
      await loadAPI('tarefasgerente_tarefas', []).then((result) => {
        for (const dado of result) {
          dadosTerefa[0] = dado;
        }
      });
    })();
  });

  async function loadTarefas() {
    await loadAPI('tarefasgerente_tarefas', []).then((result) => {
      for (const dado of result) {
        dadosTerefa[0] = dado;
      }
      return;
    });
  }

  function handleDiv() {
    if (configCard.extended) {
      setConfigCard({
        extended: false,
        opacity: '0',
        degSeta: '270deg',
        height: 110,
      });
    } else {
      setConfigCard({
        extended: true,
        opacity: '1',
        degSeta: '90deg',
        height: 280,
      });
    }
  }

  function handleModal() {
    setModalVisible(!modalVisible);
  }

  function handleCamera() {
    (async () => {
      const {status} = await Camera.requestPermissionsAsync();
      setHasPermission(status == 'granted');
    })();
    let newDisplay = displayCamera == 'none' ? 'inline-block' : 'none';
    setDisplayCamera(newDisplay);
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

    const {data} = await axios.get(
      `http://192.168.1.6/8LIGHT/api_sougerente/index.php/${api}?${newp}`,
    );

    return data;
  }

  function saveObs() {
    setModalVisible(!modalVisible);
    loadAPI('tarefasgerente_inserttarefas', [valueObs]);
  }

  const dados = [
    {
      loja: 'L01',
      titulo: 'Checar equipamentos de acougue',
      hora: '15:00',
      descricao:
        'Analisar se os equipamentos estao com a temperatura ideal, algum ruido, a data da ultima manutencao. Existe alguma programacao agendada',
    },
  ];

  return (
    <View style={stilos.page}>
      <View style={{width: '100%', height: '100%', display: displayCamera}}>
        <Camera
          style={{width: '100%', height: '100%'}}
          type={typeCamera}
          ref={camRef}></Camera>

        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity style={stilos.swapPic} onPress={swapCamera}>
            <ReactImage
              style={[stilos.icons, {left: '32%', top: '30%'}]}
              source={require('../assets/icons/troca.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity style={stilos.btnPic} onPress={takePicture}>
            <View style={stilos.iconPic}></View>
          </TouchableOpacity>

          {capturedPhoto && (
            <Modal animationType="slide" transparent={false} visible={modalPic}>
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
                  <Pressable onPress={() => setModalPic(false)}>
                    <ReactImage
                      style={{width: 50, height: 50}}
                      source={require('../assets/icons/confirme.png')}
                    />
                  </Pressable>

                  <Pressable onPress={() => setModalPic(false)}>
                    <ReactImage
                      style={{width: 50, height: 50}}
                      source={require('../assets/icons/fecha.png')}
                    />
                  </Pressable>
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
                  source={{uri: capturedPhoto}}
                />
              </View>
            </Modal>
          )}
        </View>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={stilos.centeredView}>
          <View style={stilos.modalView}>
            <Text style={[stilos.textTitleObs, {marginTop: 10}]}>
              Observação
            </Text>
            <TextInput
              style={stilos.inputModal}
              multiline
              numberOfLines={4}
              maxLength={45}
              onChangeText={(text) => setValueObs(text)}
            />
          </View>

          <View style={{flexDirection: 'row', marginTop: -35}}>
            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <View style={stilos.btnCancel}>
                <Text style={[stilos.textRnd, {color: 'white'}]}>Cancelar</Text>
              </View>
            </Pressable>

            <Pressable onPress={saveObs}>
              <View style={stilos.btnConfirm}>
                <Text style={[stilos.textRnd, {color: 'white'}]}>
                  Confirmar
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </Modal>

      <FlatList
        data={dados}
        renderItem={({item}) => <CardTarefa dados={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
