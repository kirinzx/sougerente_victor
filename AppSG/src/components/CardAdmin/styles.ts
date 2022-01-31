import styled from 'styled-components/native';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';

export const Card = styled.View`
  background-color: white;
  width: ${RFPercentage(47)}px;
  height: ${RFValue(200)}px;
  border-radius: 10px;
  padding: 10px 15px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: ${RFValue(20)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(22)}px;
  font-weight: bold;
`;

export const Departamento = styled.Text`
  margin-top: 10px;
  text-align: center;
  font-size: ${RFValue(17)}px;
  width: 35%
  font-weight: bold;
  border: 1px solid black;
  border-radius: 10px;
  padding-vertical: 4px;
`;

export const Status = styled.Text`
  text-align: center;
  font-size: ${RFValue(17)}px;
  font-weight: bold;
  color: white;
`;

export const ContainerFlex = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 0.2%;
`;
export const ContainerStatus = styled.View`
  margin-top: 8px;
  border: 1px solid black;
  border-radius: 10px;
  width: 35%;
  background-color: ${({ type }) =>
    type == 'Concluido' ? 'green' : type == 'Executando' ? '#FF8409' : 'red'}
  justify-content: center;
`;

export const IconLocal = styled.Image`
  width: 25px;
  height: 25px;
`;

export const IconClock = styled.Image`
  width: 28px;
  height: 28px;
`;

export const IconAvaliar = styled.Image`
  width: 30px;
  height: 30px;
  margin-left: 40px;
  margin-top: 10px;
`;

export const Dados = styled.View`
  margin-vertical: ${RFValue(20)}px;
  flex-direction: row;
  justify-content: flex-start;
`;

export const TitleDados = styled.Text`
  margin-top: 4px;
  margin-left: 10px;
  font-size: ${RFValue(19)}px;
  font-weight: bold;
`;

export const User = styled.View`
  width: 100%;
  flex-direction: row;
  align-content: space-between;
  padding-right: 20px;
`;

export const Photos = styled.Image`
  width: ${RFValue(40)}px;
  height: ${RFValue(40)}px;
  border-radius: ${RFValue(45)}px;
  background-color: red;
`;

export const Time = styled.View`
  width: 40%;
  flex-direction: row;
  align-items: center;
`;

export const ContainerPhoto = styled.View`
  width: 50%;
  flex-direction: row;
`;

export const Dia = styled.Text`
  font-size: ${RFValue(30)}px;
  font-weight: bold;
  color: #cb8d00;
  margin-horizontal: ${RFValue(5)}px;
`;

export const Hora = styled.Text`
  text-align: center;
  font-size: ${RFValue(18)}px;
  font-weight: bold;
  border: 1px solid black;
  border-radius: 10px;
  width: 65%;
  height: 65%;
`;
