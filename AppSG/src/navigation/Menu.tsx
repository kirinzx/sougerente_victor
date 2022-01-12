import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Linking, StyleSheet, Text } from 'react-native';

import {
  useIsDrawerOpen,
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentOptions,
  DrawerContentScrollView,
} from '@react-navigation/drawer';

import Screens from './Screens';
import { Block, Switch, Button, Image } from '../components';
import { useData, useTheme } from './hooks';

const Drawer = createDrawerNavigator();

/* drawer menu screens navigation */
const ScreensStack = () => {
  const { colors } = useTheme();
  const isDrawerOpen = useIsDrawerOpen();
  const animation = useRef(new Animated.Value(0)).current;

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.88],
  });

  const borderRadius = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 16],
  });

  const animatedStyle = {
    borderRadius: borderRadius,
    transform: [{ scale: scale }],
  };

  useEffect(() => {
    Animated.timing(animation, {
      duration: 200,
      useNativeDriver: true,
      toValue: isDrawerOpen ? 1 : 0,
    }).start();
  }, [isDrawerOpen, animation]);

  return (
    <Animated.View
      style={StyleSheet.flatten([
        animatedStyle,
        {
          flex: 1,
          overflow: 'hidden',
          borderColor: colors.card,
          borderWidth: isDrawerOpen ? 1 : 0,
        },
      ])}>
      {/*  */}
      <Screens />
    </Animated.View>
  );
};

/* custom drawer menu */
const DrawerContent = (
  props: DrawerContentComponentProps<DrawerContentOptions>,
) => {
  const { navigation } = props;
  const [active, setActive] = useState('Home');
  const { assets, colors, gradients, sizes } = useTheme();

  const handleNavigation = useCallback(
    (to) => {
      setActive(to);
      navigation.navigate(to);
    },
    [navigation, setActive],
  );


  // screen list for Drawer menu
  const screens = [
    { name: 'Home', to: 'HomeGerente', icon: assets.home },
    { name: 'Perfil', to: 'Profile', icon: assets.profile },
    { name: 'Tarefas ADM', to: 'TarefasAdmin', icon: assets.extras },
    { name: 'Tarefas Gerente', to: 'TarefasGerente', icon: assets.extras },
    { name: 'Indicadores', to: 'Indicadores', icon: assets.extras },
  ];

  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled
      removeClippedSubviews
      renderToHardwareTextureAndroid
      contentContainerStyle={{ paddingBottom: sizes.padding }}>
      <Block paddingHorizontal={sizes.padding}>
        <Block flex={0} row align="center" marginBottom={'20%'} style={{ width: '110%' }}>
          <Image
            radius={0}
            width={60}
            height={60}
            source={require('../assets/images/logo_grey.png')}
            marginRight={sizes.s}
          />
          <Block>
            <Text style={stilos.textLogo}>
              SOU Gerente
            </Text>
          </Block>
        </Block>

      </Block>
    </DrawerContentScrollView >
  );
};
export default () => {
  return (
    <Block color={'#5A5A67'}>
      <Drawer.Navigator
        edgeWidth={0}
        drawerType="back"
        overlayColor="transparent"
        sceneContainerStyle={{ backgroundColor: 'transparent' }}
        drawerContent={(props) => <DrawerContent {...props} />}
        drawerStyle={{
          flex: 1,
          width: '50%',
          borderRightWidth: 0,
          backgroundColor: 'transparent',
        }}>
        <Drawer.Screen name="Screens" component={ScreensStack} />
      </Drawer.Navigator>
    </Block>
  );
};

const stilos = StyleSheet.create({
  textLogo: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'OpenSans-ExtraBold'
  },

  page: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'OpenSans-Bold',

  },
})