import React, { useState } from 'react';
import { View, Text, ScrollView, FlatList, Image } from 'react-native';
import { Icon } from '../ModalAlert/styles';

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
  return (
    <Card>
      <Title>{dados.descricao}</Title>
      <Image />
      <ContainerFlex>
        <Departamento>{dados.departamento}</Departamento>
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
    </Card>
  );
}
