import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Feather} from '@expo/vector-icons';

export const Container = styled.View`
  background-color: white;
  margin: 15px 5px;
  border-radius: 10px;
`;

export const ContainerInf = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: ${RFValue(15)}px;
  width: 100%;
`;

export const BlockLoja = styled.View`
  background-color: #cb8d00;
  height: 28px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  width: 25%;
`;

export const BlockInf = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 55%;
`;

export const Title = styled.Text`
  font-size: 17px;
  color: white;
  font-family: OpenSans-Bold;
`;

export const Periodo = styled.Text`
  font-size: 27px;
  font-family: OpenSans-Bold;
  color: #cb8d00;
`;

export const ContainerTime = styled.View`
  width: ${RFValue(80)}px;
  height: 100%;
  border-radius: 30px;
  border: 2px solid black;
  align-items: center;
`;

export const TitleHora = styled.Text`
  font-size: 17px;
  color: black;
  font-family: OpenSans-Bold;
`;

export const ContainerPeriodo = styled.View`
  justify-content: center;
`;
