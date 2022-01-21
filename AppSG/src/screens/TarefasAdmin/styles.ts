import styled from 'styled-components/native';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

export const Container = styled.View`
  flex: 1;
  background-color: #cb8d00;
  align-items: center;
  justifyContent: center;
  padding-top: ${RFValue(40)}px;
`;

export const Title = styled.Text`
  color: white;
  font-family: OpenSans-SemiBold;
  margin-left: 6px;
  font-size: 18px;
`;
