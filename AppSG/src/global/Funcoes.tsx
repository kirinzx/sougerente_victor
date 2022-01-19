import React from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function loadAPI(api, param) {
  let newp = '';
  if (param) {
    if (param.length != 0) {
      for (let x = 0; x < param.length; x++) newp += `p${x + 1}=${param[x]}&`;
    }
  }
  newp = newp.slice(0, newp.length - 1);

  const conexao = '192.168.1.6'; //await Conexao();

  const {data} = await axios.get(
    `http://${conexao}/8LIGHT/api_sougerente/index.php/${api}?${newp}`,
  );

  //console.log(data);
  return data;
}

export async function Conexao() {
  let conexao = await AsyncStorage.getItem('conexao');
  if (!conexao) {
    await axios
      .get(`http://8light.ddns.net/8LIGHT/api_sougerente/index.php`)
      .then((response) => AsyncStorage.setItem('conexao', '8light.ddns.net'))
      .catch((error) => AsyncStorage.setItem('conexao', '192.168.1.6'));

    conexao = await AsyncStorage.getItem('conexao');
  }
  return conexao;
}
