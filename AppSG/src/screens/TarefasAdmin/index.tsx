import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import axios from 'axios';
import {Container, Title} from './styles';
import {CardAdmin} from '../../components/CardAdmin';
import {Button, Image} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../navigation/hooks';

export function TarefasAdmin() {
  const [canLoad, setCanLoad] = useState(false);
  const navigation = useNavigation();
  const {sizes, assets} = useTheme();

  useEffect(() => {
    loadTarefa();
  });

  let dados = [{}];
  function loadTarefa() {
    dados.splice(0, 1);
    loadAPI('tarefasadmin_tarefas', []).then((result) => {
      for (const dado of result) {
        dados.push(dado);
        if (result.length == dados.length) {
          setCanLoad(true);
        }
      }
    });
  }

  async function loadAPI(api, param) {
    let newp = '';
    if (param) {
      if (param.length != 0) {
        for (let x = 0; x < param.length; x++) newp += `p${x + 1}=${param[x]}&`;
      }
    }
    newp = newp.slice(0, newp.length - 1);

    const {data} = await axios.get(
      `http://192.168.1.6/8LIGHT/api_sougerente/index.php/${api}?${newp}`,
    );

    return data;
  }

  return (
    <>
      {canLoad && (
        <Container>
          <Button
            row
            style={{alignSelf: 'flex-start', marginLeft: 20, marginBottom: 10}}
            flex={0}
            onPress={() => navigation.goBack()}>
            <Image
              radius={0}
              width={10}
              height={18}
              color={'white'}
              source={assets.arrow}
              transform={[{rotate: '180deg'}]}
            />
            <Title>Voltar</Title>
          </Button>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            style={{flexGrow: 1}}
            contentContainerStyle={{alignItems: 'center'}}
            data={dados}
            renderItem={({item}) => <CardAdmin dados={item} />}
            showsVerticalScrollIndicator={false}
          />
        </Container>
      )}
    </>
  );
}
