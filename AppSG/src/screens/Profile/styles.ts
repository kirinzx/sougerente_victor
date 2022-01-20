import styled from 'styled-components/native';
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';
import {Feather} from '@expo/vector-icons';

export const Container = styled.View`
  flex: 1;
  background-color: white;
  padding: 15px;
  padding-top: 40px;
  align-items: center;
`;

export const ContainerUser = styled.View`
  width: 100%;
  height: 45%;
  background-color: #cb8d00;
  justify-content: flex-start;
  align-items: center;
  border-radius: 20px;
  padding-top: 5%;
`;

export const ContainerFoto = styled.View`
  border-radius: ${RFValue(80)}px;
  border: 3px solid white;
`;

export const Foto = styled.Image`
  width: ${RFValue(160)}px;
  height: ${RFValue(160)}px;
  border-radius: ${RFValue(77)}px;
`;

export const ButtonPhoto = styled.TouchableOpacity``;

export const ViewInf = styled.View`
  height: 28%;
  justify-content: space-around;
`;

export const Nome = styled.Text`
  margin-vertical: 10px;
  font-weight: bold;
  color: white;
  font-size: ${RFValue(25)}px;
  text-align: center;
`;

export const Email = styled.Text`
  color: white;
  font-size: ${RFValue(20)}px;
  text-align: center;
`;

export const ContainerTarefas = styled.View`
  justify-content: space-between;
  align-items: center;
  position: absolute;
  width: 89%;
  height: 12%;
  top: 45%;
  flex-direction: row;
  background-color: #8c8c8c;
  border-radius: 20px;
`;

export const ContainerText = styled.View`
  width: 33%;
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
  height: ${RFValue(120)}px;
  background-color: #cb8d00;
  margin-top: 20px;
  border-radius: 10px;
  padding: 15px 10px;
  justify-content: space-between;
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

export const ContainerBack = styled.TouchableOpacity`
  position: absolute;
  left: 15px;
  top: 15px;
  flex-direction: row;
  color: white;
  align-items: center;
`;

export const TitleBack = styled.Text`
  font-weight: bold;
  color: white;
  font-size: ${RFValue(18)}px;
  margin-left: 10px;
`;
