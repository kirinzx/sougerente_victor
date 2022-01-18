import styled from 'styled-components/native';
import {TouchableHighlightComponent, TouchableOpacity} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

export const Container = styled(TouchableOpacity)`
  margin-top: 20px;
  border-width: 1;
  border-color: white;
  background-color: #a87500;
  border-radius: 20px;
  padding-horizontal: 20px;
  padding-vertical: 5px;
`;

export const Text = styled.Text`
  color: white,
  font-weight: bold,
`;
