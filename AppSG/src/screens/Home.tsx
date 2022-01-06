import React, { useCallback, useState, Touc } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

import { useData, useTheme, useTranslation } from '../navigation/hooks/';
import { Block, Button, Image, Input, Product, Text } from '../components/';

const Home = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState<number>(0);
  const { following, trending } = useData();
  const [products, setProducts] = useState(following);
  const { assets, colors, fonts, gradients, sizes } = useTheme();

  const handleProducts = useCallback(
    (tab: number) => {
      setTab(tab);
      setProducts(tab === 0 ? following : trending);
    },
    [following, trending, setTab, setProducts],
  );

  return (
    <Block marginTop={sizes.m} paddingHorizontal={sizes.padding}>
      {/* inline cards */}
      <Block row marginTop={sizes.sm}>
        <Block card marginRight={sizes.sm}>
          <Image
            resizeMode="cover"
            source={require('../assets/images/usabilidade.png')}
            style={{ width: '100%' }}
          />
          <Block padding={sizes.s} justify="space-between">
            <Text p marginBottom={sizes.s}>
              Indicadores
            </Text>
          </Block>
        </Block>
        <Block card>
          <Image
            resizeMode="cover"
            source={assets?.card3}
            style={{ width: '100%' }}
          />
          <Block padding={sizes.s} justify="space-between">
            <Text p marginBottom={sizes.s}>
              The highest status people.
            </Text>
            <TouchableOpacity>
              <Block row align="center">
                <Text p semibold marginRight={sizes.s} color={colors.link}>
                  Read Article
                </Text>
                <Image source={assets.arrow} color={colors.link} />
              </Block>
            </TouchableOpacity>
          </Block>
        </Block>
      </Block>
      <Block row marginTop={sizes.sm}>
        <Block card marginRight={sizes.sm}>
          <Image
            resizeMode="cover"
            source={assets?.card2}
            style={{ width: '100%' }}
          />
          <Block padding={sizes.s} justify="space-between">
            <Text p marginBottom={sizes.s}>
              New ways to meet your business goals.
            </Text>
            <TouchableOpacity>
              <Block row align="center">
                <Text p semibold marginRight={sizes.s} color={colors.link}>
                  Read Article
                </Text>
                <Image source={assets.arrow} color={colors.link} />
              </Block>
            </TouchableOpacity>
          </Block>
        </Block>
        <Block card>
          <Image
            resizeMode="cover"
            source={assets?.card3}
            style={{ width: '100%' }}
          />
          <Block padding={sizes.s} justify="space-between">
            <Text p marginBottom={sizes.s}>
              The highest status people.
            </Text>
            <TouchableOpacity>
              <Block row align="center">
                <Text p semibold marginRight={sizes.s} color={colors.link}>
                  Read Article
                </Text>
                <Image source={assets.arrow} color={colors.link} />
              </Block>
            </TouchableOpacity>
          </Block>
        </Block>
      </Block>
      <Block row marginTop={sizes.sm}>
      </Block>
    </Block>
  );
};

export default Home;
