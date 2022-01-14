import React, {useState, useEffect} from 'react';
import {Modal, View, Text} from 'react-native';
import {Container, Titulo, Icon, ModalPosition} from './styles';

interface Props {
  visible: boolean;
  msg: string;
}

export function ModalAlert({visible, msg}: Props) {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <ModalPosition>
        <Container>
          <Icon name="check-circle" />
          <Titulo>{msg}</Titulo>
        </Container>
      </ModalPosition>
    </Modal>
  );
}

import stilos from '../../screens/stilos/TarefasGerente';
