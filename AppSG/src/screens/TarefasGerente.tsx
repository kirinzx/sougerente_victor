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
  FlatList,
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
      await loadTarefas();
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
      titulo: 'Preco da coca alto da berinjela',
      hora: '15:00',
      descricao: 'Preco da coquinha da embacado',
    },
    {
      loja: 'L02',
      titulo: 'Ar condicionar muito gelado',
      hora: '11:30',
      descricao: 'Ar condicionado trincando os dedo de geral.',
    },
    {
      loja: 'L02',
      titulo: 'Ar condicionar muito gelado',
      hora: '11:30',
      descricao: 'Ar condicionado trincando os dedo de geral.',
    },
    {
      loja: 'L02',
      titulo: 'Ar condicionar muito gelado',
      hora: '11:30',
      descricao: 'Ar condicionado trincando os dedo de geral.',
    },
  ];

  return (
    <Block safe style={stilos.page}>
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

      <Block
        scroll
        paddingHorizontal={sizes.s}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: sizes.padding}}>
        <FlatList
          data={dados}
          renderItem={({item}) => <CardTarefa dados={item} />}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
        />

        {/*         <Block flex={1} marginVertical={15}>
          <Block
            flex={0}
            height={configCard.height}
            radius={sizes.sm}
            marginHorizontal="2%"
            color="white"
            style={stilos.shadowProp}>
            <View style={stilos.task}>
              <Text style={stilos.titleTask}>Verificar placas de anúncio</Text>
            </View>
            <Block
              row
              flex={0}
              overflow="hidden"
              justify="space-evenly"
              paddingVertical={sizes.sm}
              renderToHardwareTextureAndroid>
              <Block align="center" style={[stilos.blockLoja]}>
                <Text style={[stilos.textRnd, {color: 'white'}]}>L01</Text>
              </Block>

              <Block marginLeft={20}>
                <Image
                  width={25}
                  height={25}
                  marginTop={5}
                  marginLeft={40}
                  source={require('../assets/icons/tempo.png')}
                />
              </Block>
              <Block marginRight={-30} marginTop={2}>
                <Text style={[stilos.textRepet, stilos.paddingD]}>D</Text>
              </Block>
              <Block align="center" style={stilos.textLimite} marginRight={-40}>
                <Text style={[stilos.textRnd]}>18:00</Text>
              </Block>

              <Block marginLeft={-15}></Block>

              <TouchableOpacity onPress={handleDiv}>
                <Block align="center" marginRight={20}>
                  <Image
                    width={25}
                    height={25}
                    marginTop={5}
                    marginRight={0}
                    transform={[{rotate: configCard.degSeta}]}
                    source={require('../assets/icons/seta.png')}
                  />
                </Block>
              </TouchableOpacity>
            </Block>

            <View
              style={{
                opacity: configCard.opacity,
                marginTop: 10,
              }}>
              <View>
                <Text style={stilos.textTitleObs}>Descrição da tarefa:</Text>
              </View>

              <Block
                row
                height={150}
                flex={0}
                paddingHorizontal={5}
                marginBottom={-50}
                radius={sizes.sm}
                overflow="hidden"
                paddingVertical={sizes.sm}
                renderToHardwareTextureAndroid>
                <View style={stilos.cardExtentedLeft}>
                  <Text style={stilos.textObs}>
                    Verificar preço, cor e local das placas de anúncio.
                  </Text>
                </View>
              </Block>

              <Block
                row
                flex={1}
                paddingHorizontal={5}
                paddingVertical={sizes.sm}>
                <TouchableOpacity style={{marginLeft: 10}}>
                  <ReactImage
                    style={stilos.icons}
                    source={require('../assets/icons/mais.png')}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{marginLeft: 15}}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <ReactImage
                    style={[stilos.icons]}
                    source={require('../assets/icons/editar.png')}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{marginTop: 0, marginLeft: 15}}
                  onPress={handleCamera}>
                  <ReactImage
                    style={stilos.icons}
                    source={require('../assets/icons/camera.png')}
                  />
                </TouchableOpacity>

                <View style={[stilos.textCardSelect, {marginLeft: 50}]}>
                  <Text style={[stilos.textRnd, {color: 'white'}]}>
                    Concluir
                  </Text>
                </View>
              </Block>
            </View>
          </Block>
        </Block> */}
      </Block>
    </Block>
  );
}
