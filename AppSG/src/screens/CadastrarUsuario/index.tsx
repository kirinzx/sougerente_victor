import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';

import {
  Container,
  Card,
  CardAmarelo,
  ContainerInput,
  UserIcon,
  ButtonCad,
  ButtonCadText,
  Input,
  TextoInput,
} from './styles';
import AppLoading from 'expo-app-loading';

import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import { cos } from 'react-native-reanimated';
import { RFValue } from 'react-native-responsive-fontsize';

export default function CadastrarUsuario() {
  const [nome, setNome] = useState(['', false]);
  const [apelido, setApelido] = useState('');
  const [celular, setCelular] = useState(['', false]);
  const [cpf, setCpf] = useState(['', false]);
  const [email, setEmail] = useState(['', false]);
  const cargos = [{ label: 'Selecione...', value: '0' }];
  let cargo = '';
  let estabelecimento = '';

  async function loadAPI(api, param) {
    let newp = '';
    if (param) {
      if (param.length != 0) {
        for (let x = 0; x < param.length; x++) newp += `p${x + 1}=${param[x]}&`;
      }
    }
    newp = newp.slice(0, newp.length - 1);

    const { data } = await axios.get(
      `http://192.168.1.6/8LIGHT/api_sougerente/index.php/${api}?${newp}`,
    );

    return data;
  }

  function clickCad() {
    let arrCampo = [apelido, nome, celular, cpf, email, cargo, estabelecimento];
    let arrNome = [
      'apelido',
      'nome',
      'celular',
      'cpf',
      'email',
      'cargo',
      'estabelecimento',
    ];
    for (let x = 1; x < arrCampo.length; x++) {
      if (arrCampo[x][0] == '') {
        arrNome[x] == 'nome'
          ? setNome([nome[0], true])
          : arrNome[x] == 'celular'
            ? setCelular([celular[0], true])
            : arrNome[x] == 'cpf'
              ? setCpf([cpf[0], true])
              : arrNome[x] == 'email'
                ? setEmail([email[0], true])
                : (x = x);
      } else {
        arrNome[x] == 'nome'
          ? setNome([nome[0], false])
          : arrNome[x] == 'celular'
            ? setCelular([celular[0], false])
            : arrNome[x] == 'cpf'
              ? setCpf([cpf[0], false])
              : arrNome[x] == 'email'
                ? setEmail([email[0], false])
                : (x = x);
      }
    }

    return;
    loadAPI('cadastrarusuario_insertusuario', arrCampo);
  }

  function loadDepartamento() {
    loadAPI('cadastrarusuario_loaddepartamento', []).then((result) => {
      for (const dado of result) {
        cargos.push(dado);
      }
    });
  }

  function handleCelular(valor) {
    if (valor.length < celular[0].length) {
      setCelular([valor, false]);
      return;
    }

    if (valor.length == 1) valor = '(' + valor;
    else if (valor.length == 3) valor += ') ';
    else if (valor.length == 10) valor += '-';

    setCelular([valor, false]);
  }

  function handleCPF(valor) {
    if (valor.length < cpf[0].length) {
      setCpf([valor, false]);
      return;
    }

    if (valor.length == 3 || valor.length == 7) valor += '.';
    else if (valor.length == 11) valor += '-';

    setCpf([valor, false]);
  }

  useEffect(() => {
    loadDepartamento();
  });

  return (
    <>
      <CardAmarelo />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}>
        <Container>
          <Card>
            <UserIcon source={require('../../assets/icons/user.png')} />

            <ContainerInput>
              <ScrollView
                style={{ width: '100%', paddingTop: 8 }}
                showsVerticalScrollIndicator={false}>
                <View style={stilo.containerInput}>
                  <TextoInput>Nome Completo</TextoInput>
                  <Input
                    onChangeText={(valor) => setNome([valor, false])}
                    style={{
                      borderWidth: 0.5,
                      backgroundColor: !nome[1] ? '#f7f3e9' : '#f7dfd5',
                      borderColor: !nome[1] ? 'transparent' : 'red',
                    }}></Input>
                </View>

                <View style={stilo.containerInput}>
                  <TextoInput>Apelido (Opcional)</TextoInput>
                  <Input onChangeText={setApelido}></Input>
                </View>

                <View style={stilo.containerInput}>
                  <TextoInput>Celular</TextoInput>
                  <Input
                    maxLength={15}
                    keyboardType="numeric"
                    value={celular[0]}
                    onChangeText={(valor) => handleCelular(valor)}
                    style={{
                      borderWidth: 0.5,
                      backgroundColor: !celular[1] ? '#f7f3e9' : '#f7dfd5',
                      borderColor: !celular[1] ? 'transparent' : 'red',
                    }}></Input>
                </View>

                <View style={stilo.containerInput}>
                  <TextoInput>CPF</TextoInput>
                  <Input
                    maxLength={14}
                    keyboardType="numeric"
                    value={cpf[0]}
                    onChangeText={(valor) => handleCPF(valor)}
                    style={{
                      borderWidth: 0.5,
                      backgroundColor: !cpf[1] ? '#f7f3e9' : '#f7dfd5',
                      borderColor: !cpf[1] ? 'transparent' : 'red',
                    }}></Input>
                </View>

                <View style={stilo.containerInput}>
                  <TextoInput>Email</TextoInput>
                  <Input
                    keyboardType="email-address"
                    onChangeText={(valor) => setEmail([valor, false])}
                    style={{
                      borderWidth: 0.5,
                      backgroundColor: !email[1] ? '#f7f3e9' : '#f7dfd5',
                      borderColor: !email[1] ? 'transparent' : 'red',
                    }}></Input>
                </View>

                <View style={stilo.containerInput}>
                  <TextoInput>Estabelecimento</TextoInput>
                  <RNPickerSelect
                    style={pickerSelectStyles}
                    placeholder={{}}
                    onValueChange={(valor) => (estabelecimento = valor)}
                    items={[
                      { label: 'Selecione...', value: '1' },
                      { label: 'LOJA 01', value: '1' },
                      { label: 'LOJA 02', value: '2' },
                      { label: 'LOJA 03', value: '3' },
                    ]}
                  />
                </View>

                <View style={stilo.containerInput}>
                  <TextoInput>Cargo</TextoInput>
                  <RNPickerSelect
                    style={pickerSelectStyles}
                    placeholder={{}}
                    onValueChange={(valor) => (cargo = valor)}
                    items={cargos}
                  />
                </View>
              </ScrollView>
            </ContainerInput>
          </Card>

          <ButtonCad onPress={clickCad}>
            <ButtonCadText>CADASTRAR</ButtonCadText>
          </ButtonCad>
        </Container>
      </KeyboardAvoidingView>
    </>
  );
}

const stilo = StyleSheet.create({
  containerInput: {
    position: 'relative',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: '#f7f3e9',
    width: '93%',
    marginLeft: 8,
    marginBottom: RFValue(5) + '%',
    paddingVertical: RFValue(5) + '%',
    paddingHorizontal: 10,
    fontSize: 14,
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    backgroundColor: '#f7f3e9',
    width: '93%',
    marginLeft: 10,
    marginBottom: '3.5%',
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 14,
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
});
