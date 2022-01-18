import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import axios from 'axios';

interface Props {
  visible: boolean;
  id: string;
  observacao: string;
  close: () => void;
}

export function ModalImage({ visible, id, close, observacao }: Props) {
  const [valueObs, setValueObs] = useState(observacao);

  function saveObs() {
    if (!valueObs) {
      Alert.alert('Digite a observação antes de continuar!');
      return;
    }

    if (!observacao) loadAPI('tarefasgerente_inserttarefas', [valueObs, id]);
    else loadAPI('tarefasgerente_updatetarefas', [valueObs, id]);

    close();
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
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={stilos.centeredView}>
        <View style={stilos.modalFotinha}>
          <Image
            style={{ width: '100%', height: '100%', borderRadius: 20 }}
            source={require('../../assets/images/victor.jpeg')}
          />
        </View>

        <View style={{ flexDirection: 'row', marginTop: -35 }}>
          <TouchableOpacity onPress={() => close()}>
            <View style={stilos.btnCancel}>
              <Text style={[stilos.textRnd, { color: 'white' }]}>Cancelar</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={saveObs}>
            <View style={stilos.btnConfirm}>
              <Text style={[stilos.textRnd, { color: 'white' }]}>Confirmar</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

import stilos from '../../screens/stilos/TarefasGerente';
