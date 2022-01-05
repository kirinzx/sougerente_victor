import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

export const Container = styled.View`
  height: ${({ height }) => RFValue(height + 5)}px;
  background-color: white;
  margin: 15px 5px;
  border-radius: 10px;
`;

export const Title = styled.Text`
  font-size: 18px;
  color: white;
`;
