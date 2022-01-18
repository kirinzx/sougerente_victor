import styled from 'styled-components/native';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  background-color: #cb8d00;
  align-items: center;
`;

export const Card = styled.View`
  background-color: white;
  height: 83%;
  width: 90%;
  margin-top: ${RFPercentage(1.9)}%;
  border-radius: 10px;
  align-items: center;
`;

export const CardAmarelo = styled.View`
  background-color: #cb8d00;
  border-radius: 10px;
  width: ${RFValue(80)}px;
  height: ${RFValue(20)}px;
  position: absolute;
  top: ${RFPercentage(1.15)}%;
  left: 39%;
  z-index: 1;
`;

export const ContainerInput = styled.View`
  flex: 1;
  margin-top: -${RFValue(2)}%;
  padding-horizontal: 15px;
  width: 100%;
  height: 100%;
`;

export const UserIcon = styled.Image`
  width: 88px;
  height: 88px;
  margin-top: ${RFPercentage(2.2)}%;
  margin-bottom: 4%;
`;

export const ButtonCad = styled.TouchableOpacity`
  margin-top: 20px;
  border-width: 1px;
  border-color: white;
  background-color: #a87500;
  border-radius: 20px;
  padding: 5px 20px;
`;

export const ButtonCadText = styled.Text`
  color: white;
  font-weight: bold;
`;

export const Input = styled.TextInput`
  background-color: #f7f3e9;
  margin-left: ${RFValue(10)}px;
  margin-bottom: ${RFValue(5)}%;
  width: 93%;
  padding-vertical: ${RFValue(5)}%;
  padding-horizontal: ${RFValue(10)}px;
  border-radius: ${RFValue(8)}px;
`;

export const TextoInput = styled.Text`
  color: black;
  font-weight: bold;
  top: -8px;
  left: ${RFValue(10)}%;
  font-size: ${RFValue(18)}px;
  position: absolute;
  z-index: 1;
`;
