import styled from 'styled-components/native';
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';
import {Feather} from '@expo/vector-icons';

export const Container = styled.View`
  flex: 1;
  background-color: white;
  align-items: center;
  padding-top: 15%;
`;

export const Background = styled.View`
  top: -42%;
  position: absolute;
  width: 80%;
  height: 80%;
  background-color: #cb8d00;
  transform: rotate(105deg);
`;

export const ContainerUser = styled.View`
  width: 100%;
  align-items: center;
`;

export const Foto = styled.Image`
  width: ${RFValue(160)}px;
  height: ${RFValue(160)}px;
  border-radius: ${RFValue(80)}px;
  border: 3px solid white;
`;

export const ViewInf = styled.View``;

export const Nome = styled.Text`
  margin-vertical: 10px;
  font-weight: bold;
  color: #404040;
  font-size: ${RFValue(25)}px;
  text-align: center;
`;

export const Email = styled.Text`
  color: black;
  font-size: ${RFValue(20)}px;
  text-align: center;
`;

export const ContainerTarefas = styled.View`
  justify-content: space-between;
  align-items: center;
  width: 89%;
  height: 12%;
  top: 5%;
  flex-direction: row;
  border-radius: 20px;
`;

export const ContainerText = styled.View`
  border-radius: 10px;
  width: 30%;
  height: 100%;
  background-color: #8c8c8c;
`;

export const TextNum = styled.Text`
  top: 10px;
  font-weight: bold;
  color: white;
  font-size: ${RFValue(25)}px;
  text-align: center;
`;

export const TextDesc = styled.Text`
  margin-vertical: 10px;
  color: white;
  font-size: ${RFValue(17)}px;
  text-align: center;
`;

export const ContainerCard = styled.View`
  width: 90%;
  height: ${RFValue(120)}px;
  background-color: #cb8d00;
  margin-top: 20px;
  border-radius: 10px;
  padding: 15px 10px;
  justify-content: space-between;
  align-self: center;
`;

export const Title = styled.Text`
  text-align: center;
  color: white;
  font-size: ${RFValue(28)}px;
  font-weight: bold;
`;

export const ContainerInf = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
`;

export const Periodo = styled.Text`
  text-align: center;
  color: white;
  font-size: ${RFValue(23)}px;
  font-weight: bold;
  border: 2px solid white;
  border-radius: 15px;
  width: 45%;
`;

export const Status = styled.Text`
  text-align: center;
  color: white;
  font-size: ${RFValue(23)}px;
  font-weight: bold;
`;

export const ContainerStatus = styled.View`
  background-color: ${({type}) =>
    type == 'Concluido' ? 'green' : type == 'Executando' ? '#FF8409' : 'red'};
  text-align: center;
  border: 2px solid white;
  border-radius: 15px;
  width: 45%;
`;
