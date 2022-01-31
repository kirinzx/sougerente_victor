import React, { useState } from 'react';
import { Camera } from 'expo-camera';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Image as ReactImage,
} from 'react-native';

import { ModalObs } from '../ModalObs';
import { ModalImage } from '../ModalImage';
import { ModalAlert } from '../ModalAlert';
import axios from 'axios';
import {
  Container,
  ContainerInf,
  BlockLoja,
  BlockInf,
  Title,
  Periodo,
  ContainerTime,
  TitleHora,
  ContainerPeriodo,
} from './style';

interface Props {
  dados: {
    observacao: string;
    descricao: string;
    horario: string;
    periodo: string;
    titulo: string;
    loja: string;
    id: string;
  };
  //openCamera: () => void;
  loadTarefas: () => void;
}

export function CardTarefa({ dados, openCamera, loadTarefas }: Props) {
  const [configCard, setConfigCard] = useState({
    opacity: 0,
    extended: false,
    degSeta: '270deg',
    height: 120,
  });
  const [obsVisible, setObsVisible] = useState(false);
  const [imgVisible, setImgVisible] = useState(false);

  const [alert, setAlert] = useState(false);

  function handleDiv() {
    if (configCard.extended) {
      setConfigCard({
        opacity: 0,
        extended: false,
        degSeta: '270deg',
        height: 120,
      });
    } else {
      setConfigCard({
        opacity: 1,
        extended: true,
        degSeta: '90deg',
        height: 300,
      });
    }
  }

  function closeModal() {
    setObsVisible(false);
  }

  function concluirTarefa(id) {
    loadAPI('tarefasgerente_concluirtarefa', [id]);
    loadTarefas();

    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 2500);

    setConfigCard({
      opacity: '0',
      extended: false,
      degSeta: '270deg',
      height: 120,
    });
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

  return (
    <>
      <ModalAlert visible={alert} msg={'Tarefa concluida com sucesso!'} />

      <ModalObs
        visible={obsVisible}
        close={closeModal}
        id={dados.id}
        observacao={dados.observacao}
      />

      <ModalImage
        visible={imgVisible}
        close={closeModal}
        id={dados.id}
        observacao={dados.observacao}
      />

      <Container height={configCard.height}>
        <View style={{ paddingVertical: 7 }}>
          <Text style={style.titleTask}>{dados.titulo}</Text>

          <ContainerInf>
            <BlockLoja>
              <Title>{dados.loja}</Title>
            </BlockLoja>
            <BlockInf>
              <ContainerPeriodo>
                <Image
                  style={style.icone}
                  source={require('../../assets/icons/tempo.png')}
                />
              </ContainerPeriodo>

              <Periodo>{dados.periodo}</Periodo>
              <ContainerTime>
                <TitleHora>{dados.horario}</TitleHora>
              </ContainerTime>

              <TouchableOpacity onPress={handleDiv}>
                <Image
                  style={{ width: 25, height: 25, marginTop: 5, marginLeft: 5 }}
                  transform={[{ rotate: configCard.degSeta }]}
                  source={require('../../assets/icons/seta.png')}
                />
              </TouchableOpacity>
            </BlockInf>
          </ContainerInf>
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

          <View style={{ flexDirection: 'row', marginTop: 17, marginLeft: 5 }}>
            <TouchableOpacity
              style={{ marginLeft: 15 }}
              onPress={() => setImgVisible(true)}>
              <ReactImage
                style={[stilos.icons]}
                source={require('../../assets/icons/editar.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{ marginTop: 0, marginLeft: 15 }}
              onPress={openCamera}>
              <ReactImage
                style={stilos.icons}
                source={require('../../assets/icons/camera.png')}
              />
            </TouchableOpacity>

            <View style={stilos.containerConcluir}>
              <View style={[stilos.textCardSelect]}>
                <TouchableOpacity onPress={() => concluirTarefa(dados.id)}>
                  <Text style={[stilos.textRnd, { color: 'white' }]}>
                    Concluir
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Container>
    </>
  );
}

import stilos from '../../screens/stilos/TarefasGerente';
const style = StyleSheet.create({
  icone: {
    width: 28,
    height: 28,
  },

  containerInf: {
    backgroundColor: 'red',
    flexDirection: 'row',
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
