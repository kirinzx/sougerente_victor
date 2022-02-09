import React, { useState } from 'react';
import { View, Text, ScrollView, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from '../ModalAlert/styles';
import Modal from 'react-native-modal';

import {
  Card,
  Title,
  Departamento,
  ContainerFlex,
  Status,
  ContainerStatus,
  IconLocal,
  Dados,
  TitleDados,
  User,
  Photos,
  Time,
  ContainerPhoto,
  Dia,
  Hora,
  IconClock,
  IconAvaliar,
} from './styles';

interface Props {
  dados: {
    descricao: string;
    departamento: string;
    status: string;
    setor: string;
    horario: string;
    sigla: string;
    foto: string;
  };
}

export function CardAdmin({ dados }: Props) {

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  /* RATING */
  const [defaultRating, setDefaultRating] = useState('');
  const [defaultRating2, setDefaultRating2] = useState('');
  const [defaultRating3, setDefaultRating3] = useState('');
  const [defaultRating4, setDefaultRating4] = useState('');
  const [defaultRating5, setDefaultRating5] = useState('');

  const [maxRating, setMaxRating] = useState(['Muito Ruim']);
  const [maxRating2, setMaxRating2] = useState(['Ruim']);
  const [maxRating3, setMaxRating3] = useState(['Neutro']);
  const [maxRating4, setMaxRating4] = useState(['Bom']);
  const [maxRating5, setMaxRating5] = useState(['Muito Bom']);

  const starImgFilled = 'http://192.168.1.6/8LIGHT/api_sougerente/images/Avaliacao/angry.png'
  const starImgCorner = 'http://192.168.1.6/8LIGHT/api_sougerente/images/Avaliacao/angry_white.png'
  const sadImgFilled = 'http://192.168.1.6/8LIGHT/api_sougerente/images/Avaliacao/triste.png'
  const sadImgCorner = 'http://192.168.1.6/8LIGHT/api_sougerente/images/Avaliacao/triste_white.png'
  const neutroImgFilled = 'http://192.168.1.6/8LIGHT/api_sougerente/images/Avaliacao/neutro.png'
  const neutroImgCorner = 'http://192.168.1.6/8LIGHT/api_sougerente/images/Avaliacao/neutro_white.png'
  const bomImgFilled = 'http://192.168.1.6/8LIGHT/api_sougerente/images/Avaliacao/bom.png'
  const bomImgCorner = 'http://192.168.1.6/8LIGHT/api_sougerente/images/Avaliacao/bom_white.png'
  const mtBomImgFilled = 'http://192.168.1.6/8LIGHT/api_sougerente/images/Avaliacao/muitobom.png'
  const mtBomImgCorner = 'http://192.168.1.6/8LIGHT/api_sougerente/images/Avaliacao/muitobom_white.png'

  function emoji1(item) {
    setDefaultRating(item);
    setDefaultRating2('');
    setDefaultRating3('');
    setDefaultRating4('');
    setDefaultRating5('');
  }

  function emoji2(item) {
    setDefaultRating('');
    setDefaultRating2(item);
    setDefaultRating3('');
    setDefaultRating4('');
    setDefaultRating5('');
  }

  function emoji3(item) {
    setDefaultRating('');
    setDefaultRating2('');
    setDefaultRating3(item);
    setDefaultRating4('');
    setDefaultRating5('');
  }

  function emoji4(item) {
    setDefaultRating('');
    setDefaultRating2('');
    setDefaultRating3('');
    setDefaultRating4(item);
    setDefaultRating5('');
  }

  function emoji5(item) {
    setDefaultRating('');
    setDefaultRating2('');
    setDefaultRating3('');
    setDefaultRating4('');
    setDefaultRating5(item);
  }

  function cancelarModal() {
    setModalVisible(false);
    setDefaultRating('');
    setDefaultRating2('');
    setDefaultRating3('');
    setDefaultRating4('');
    setDefaultRating5('');
  }

  const CustomRatingBar = () => {
    return (
      <View style={stilos.customRatingBarStyle}>
        {
          maxRating.map((item, key) => {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                key={item}
                onPress={() => emoji1(item)}
              >
                <Image
                  style={stilos.starImgStyle}
                  source={
                    item <= defaultRating
                      ? { uri: starImgFilled }
                      : { uri: starImgCorner }
                  }
                />
              </TouchableOpacity>
            )
          })
        }
        {
          maxRating2.map((item, key) => {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                key={item}
                onPress={() => emoji2(item)}
              >
                <Image
                  style={stilos.starImgStyle}
                  source={
                    item <= defaultRating2
                      ? { uri: sadImgFilled }
                      : { uri: sadImgCorner }
                  }
                />
              </TouchableOpacity>
            )
          })
        }
        {
          maxRating3.map((item, key) => {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                key={item}
                onPress={() => emoji3(item)}
              >
                <Image
                  style={stilos.starImgStyle}
                  source={
                    item <= defaultRating3
                      ? { uri: neutroImgFilled }
                      : { uri: neutroImgCorner }
                  }
                />
              </TouchableOpacity>
            )
          })
        }
        {
          maxRating4.map((item, key) => {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                key={item}
                onPress={() => emoji4(item)}
              >
                <Image
                  style={stilos.starImgStyle}
                  source={
                    item <= defaultRating4
                      ? { uri: bomImgFilled }
                      : { uri: bomImgCorner }
                  }
                />
              </TouchableOpacity>
            )
          })
        }
        {
          maxRating5.map((item, key) => {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                key={item}
                onPress={() => emoji5(item)}
              >
                <Image
                  style={stilos.starImgStyle}
                  source={
                    item <= defaultRating5
                      ? { uri: mtBomImgFilled }
                      : { uri: mtBomImgCorner }
                  }
                />
              </TouchableOpacity>
            )
          })
        }
      </View>
    )


  }

  /* RATING */

  return (
    <Card>
      <Title>{dados.descricao}</Title>
      <ContainerFlex>
        <Departamento>{dados.departamento}</Departamento>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <IconAvaliar source={require('../../assets/icons/avalie.png')} />
        </TouchableOpacity>
        <ContainerStatus type={dados.status}>
          <Status>{dados.status}</Status>
        </ContainerStatus>
      </ContainerFlex>
      <Dados>
        <IconLocal source={require('../../assets/icons/loja.png')} />
        <TitleDados>{dados.setor}</TitleDados>
      </Dados>
      <User>
        <ContainerPhoto>
          <Photos source={{ uri: dados.foto }}></Photos>
        </ContainerPhoto>
        <Time>
          <IconClock source={require('../../assets/icons/tempo.png')} />
          <Dia>{dados.sigla}</Dia>
          <Hora>{dados.horario}</Hora>
        </Time>
      </User>
      <Modal isVisible={isModalVisible} style={stilos.modal}>
        <View style={stilos.modalContent}>

          <View style={stilos.vwTitulos}>
            <Text style={stilos.tituloTarefa}>{dados.descricao}</Text>
            <Photos source={{ uri: dados.foto }} style={{ height: 70, width: 70 }}></Photos>
          </View>

          <View style={stilos.vwEstrelas}>
            <Text style={stilos.titleAvaliar}> Avaliar Execução da Tarefa</Text>

            <CustomRatingBar />
            <Text style={stilos.starCounter}>
              {defaultRating}
              {defaultRating2}
              {defaultRating3}
              {defaultRating4}
              {defaultRating5}
            </Text>
          </View>


          <View style={stilos.vwBtn}>
            <TouchableOpacity style={stilos.btnAvaliar} onPress={() => alert(defaultRating)}>
              <Text style={stilos.txtAvaliar}> Confirmar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={stilos.btnCancelar} onPress={() => cancelarModal()}>
              <Text style={stilos.txtCancelar}>Cancelar</Text>
            </TouchableOpacity>
          </View>


        </View>


      </Modal>
    </Card>
  );
}

const stilos = StyleSheet.create({
  bck: {
    backgroundColor: '#CB8D00',
    height: '100%',
    width: '100%',

  },

  bordin: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: 20,

    shadowColor: '#757575',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
  },

  icon: {
    width: 40,
    height: 40,
    marginLeft: '3%',
    marginTop: '20%',
  },

  loja: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    marginTop: '24%',
  },

  titulo: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 24,
    marginLeft: '-23%',
    paddingRight: '4%',
  },

  shadowProp: {
    shadowColor: '#757575',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
  },

  textVoltar: {
    color: 'white',
    fontFamily: 'OpenSans-Bold',
    marginLeft: 6,
    fontSize: 18,
  },

  voltar: {
    width: 20,
    height: 20,
    marginRight: '-2%',
  },

  tituloTarefa: {
    fontFamily: 'OpenSans-ExtraBold',
    fontSize: 30,
    color: 'black',
    paddingBottom: 15,
  },

  usuarioTarefa: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
    color: 'black',

  },

  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },

  modalContent: {
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    height: '80%',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
  },

  btnAvaliar: {
    backgroundColor: '#39AF31',
    width: '45%',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: '30%',
    borderRadius: 20,
  },

  txtAvaliar: {
    fontFamily: 'OpenSans-ExtraBold',
    fontSize: 20,
    color: 'white',
  },

  txtCancelar: {
    fontFamily: 'OpenSans-ExtraBold',
    fontSize: 20,
    color: 'white',
  },

  btnCancelar: {
    backgroundColor: 'red',
    width: '45%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 20,
    marginRight: '5%',
  },

  vwBtn: {
    width: '80%',
    height: '25%',
    flexDirection: 'row-reverse',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '-80%',
    marginTop: '5%',
  },

  vwTitulos: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '-70%',
  },

  vwEstrelas: {
    marginTop: 30,
  },

  customRatingBarStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
  },

  starImgStyle: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    marginRight: 12,
    marginLeft: 10,
  },

  starCounter: {
    textAlign: 'center',
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
    marginTop: 30,
  },

  titleAvaliar: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    textAlign: 'center',
  },

});