import React from 'react';
import {TouchableOpacityProps} from 'react-native';
import {Container} from './styles';

interface Props extends TouchableOpacityProps {
  title: string;
  type: 'up' | 'down';
  active: boolean;
}

export function TypeButton({title, type, active, ...rest}: Props) {
  return (
    
  );
}
