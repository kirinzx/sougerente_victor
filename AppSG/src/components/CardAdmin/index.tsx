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
  const [defaultRating, setDefaultRating] = useState(2);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  const starImgFilled = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png'
  const starImgCorner = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png'

  const CustomRatingBar = () => {
    return (
      <View style={stilos.customRatingBarStyle}>
        {
          maxRating.map((item, key) => {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                key={item}
                onPress={() => setDefaultRating(item)}
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
          <IconAvaliar source={require('../../assets/icons/metro.png')} />
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
            <Text style={stilos.tituloTarefa}>Checar Geladeiras</Text>
            <Text style={stilos.usuarioTarefa}>Victor Pavani</Text>
          </View>

          <View style={stilos.vwEstrelas}>
            <Text style={stilos.titleAvaliar}> Avaliar Execução da Tarefa</Text>
            <Text style={stilos.titleAvaliar}>(Sendo 1 Muito Ruim e 5 Muito Bom)</Text>
            <CustomRatingBar />
            <Text style={stilos.starCounter}>
              {defaultRating + '/' + maxRating.length}
            </Text>
          </View>


          <View style={stilos.vwBtn}>
            <TouchableOpacity style={stilos.btnAvaliar} onPress={() => alert(defaultRating)}>
              <Text style={stilos.txtAvaliar}> Confirmar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={stilos.btnCancelar} onPress={() => setModalVisible(false)}>
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
    height: '60%',
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
    width: 40,
    height: 40,
    resizeMode: 'cover',
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