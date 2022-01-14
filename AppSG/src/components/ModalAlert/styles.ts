import styled from 'styled-components/native';
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';
import {Feather} from '@expo/vector-icons';

export const Container = styled.View`
  padding: 15px;
  background-color: #e6e6e6;
  border-radius: 20px;
  height: 12%;
  width: 90%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const Titulo = styled.Text`
  font-weight: bold;
  font-size: 14px;
`;

export const Icon = styled(Feather)`
  color: green;
  font-size: 30px;
`;

export const ModalPosition = styled.View`
  background-color: #000000aa;
  height: 100%;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 10%;
`;
