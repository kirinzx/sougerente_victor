import React, {useState, useRef} from 'react';
import {Container} from './style';
import {Camera} from 'expo-camera';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Image as ReactImage,
  Modal,
  Pressable,
} from 'react-native';

interface Props {
  dados: {
    loja: string;
    titulo: string;
    hora: string;
    descricao: string;
  };
}

export function CardTarefa({dados}: Props) {
  let obj = {
    opacity: '0',
    extended: false,
    degSeta: '270deg',
    height: 120,
  };

  const [configCard, setConfigCard] = useState(obj);
  const [hasPermission, setHasPermission] = useState(false);
  const [displayCamera, setDisplayCamera] = useState('none');
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [typeCamera, setTypeCamera] = useState(Camera.Constants.Type.front);
  const [modalPic, setModalPic] = useState(false);
  const camRef = useRef(null);

  function handleDiv() {
    if (configCard.extended) {
      setConfigCard({
        opacity: '0',
        extended: false,
        degSeta: '270deg',
        height: 120,
      });
    } else {
      setConfigCard({
        opacity: '1',
        extended: true,
        degSeta: '90deg',
        height: 340,
      });
    }
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

  return (
    <Container height={configCard.height}>
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
              source={require('../../assets/icons/troca.png')}
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
                      source={require('../../assets/icons/confirme.png')}
                    />
                  </Pressable>

                  <Pressable onPress={() => setModalPic(false)}>
                    <ReactImage
                      style={{width: 50, height: 50}}
                      source={require('../../assets/icons/fecha.png')}
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
      <View style={{paddingVertical: 7}}>
        <Text style={style.titleTask}>{dados.titulo}</Text>

        <View style={{flexDirection: 'row'}}>
          <View style={[stilos.blockLoja, {width: '21%'}]}>
            <Text style={[stilos.textRnd, {color: 'white'}]}>{dados.loja}</Text>
          </View>

          <View>
            <Image
              style={style.icone}
              source={require('../../assets/icons/tempo.png')}
            />
          </View>
          <Text style={style.letraDia}>D</Text>
          <View style={style.textTime}>
            <Text style={[stilos.textRnd]}>{dados.hora}</Text>
          </View>
          <TouchableOpacity onPress={handleDiv}>
            <Image
              style={{width: 25, height: 25, marginTop: 5, marginLeft: 5}}
              transform={[{rotate: configCard.degSeta}]}
              source={require('../../assets/icons/seta.png')}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          opacity: configCard.opacity,
          marginVertical: 20,
        }}>
        <Text style={stilos.textTitleObs}>Descrição da tarefa:</Text>

        <View style={style.cardExtented}>
          <Text style={stilos.textObs}>{dados.descricao}</Text>
        </View>

        <View style={{flexDirection: 'row', marginTop: 17, marginLeft: 5}}>
          <TouchableOpacity style={{marginLeft: 10}}>
            <ReactImage
              style={stilos.icons}
              source={require('../../assets/icons/mais.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity style={{marginLeft: 15}}>
            <ReactImage
              style={[stilos.icons]}
              source={require('../../assets/icons/editar.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity style={{marginTop: 0, marginLeft: 15}}>
            <ReactImage
              style={stilos.icons}
              source={require('../../assets/icons/camera.png')}
            />
          </TouchableOpacity>

          <View style={[stilos.textCardSelect, {marginLeft: 50}]}>
            <Text style={[stilos.textRnd, {color: 'white'}]}>Concluir</Text>
          </View>
        </View>
      </View>
    </Container>
  );
}

import stilos from '../../screens/stilos/TarefasGerente';
const style = StyleSheet.create({
  icone: {
    marginTop: 5,
    marginLeft: 60,
    marginRight: -5,
    width: 25,
    height: 25,
  },

  titleTask: {
    height: 50,
    fontSize: 18,
    fontFamily: 'OpenSans-ExtraBold',
    textAlign: 'left',
    marginHorizontal: 15,
    marginBottom: 8,
  },

  textTime: {
    width: 60,
    height: 28,
    borderRadius: 30,
    borderWidth: 1,
    alignItems: 'center',
    marginTop: 4,
    marginLeft: -10,
  },

  letraDia: {
    paddingHorizontal: 5,
    marginLeft: 3,
    fontSize: 27,
    fontFamily: 'OpenSans-ExtraBold',
    color: '#CB8D00',
    marginRight: 6,
    marginTop: -3,
  },

  cardExtented: {
    marginTop: 10,
    marginLeft: 8,
    width: '95%',
    height: 90,
    backgroundColor: '#DFDFDE',
    borderRadius: 20,
  },
});
