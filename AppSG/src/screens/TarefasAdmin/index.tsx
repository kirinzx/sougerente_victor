import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, FlatList} from 'react-native';
import axios from 'axios';
import {Container} from './styles';
import {CardAdmin} from '../../components/CardAdmin';

export function TarefasAdmin() {
  const [canLoad, setCanLoad] = useState(false);

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
