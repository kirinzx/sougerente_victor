import React, { Component } from 'react';
import PropTypes from "prop-types";
import { StyleSheet, Text, View, TextInput, FlatList, Picker, ScrollView, TouchableHighlight } from 'react-native';
import { Image as ReactImage } from 'react-native';


export default class HomeAdmin extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }


  handlePress(target, owner) {
    if (this.props.onPress) {
      let name;
      let id;
      let index = -1;
      if (target.search("::") > -1) {
        const varCount = target.split("::").length;
        if (varCount === 2) {
          name = target.split("::")[0];
          id = target.split("::")[1];
        } else if (varCount === 3) {
          name = target.split("::")[0];
          index = parseInt(target.split("::")[1]);
          id = target.split("::")[2];
        }
      } else {
        name = target;
      }
      this.props.onPress({ type: 'button', name: name, index: index, id: id, owner: owner });
    }
  }

  handleChangeTextinput(name, value) {
    let id;
    let index = -1;
    if (name.search('::') > -1) {
      const varCount = name.split("::").length;
      if (varCount === 2) {
        name = name.split("::")[0];
        id = name.split("::")[1];
      } else if (varCount === 3) {
        name = name.split("::")[0];
        index = name.split("::")[1];
        id = name.split("::")[2];
      }
    } else {
      name = name;
    }
    let state = this.state;
    state[name.split('::').join('')] = value;
    this.setState(state, () => {
      if (this.props.onChange) {
        this.props.onChange({ type: 'textinput', name: name, value: value, index: index, id: id });
      }
    });
  }

  render() {

    return (
      <ScrollView data-layer="aef240a3-e902-4937-b608-e4ce29704c36" style={styles.homeAdmin}>
        <Text data-layer="413df5ab-0ccb-48c6-b773-e559e04da00f" style={styles.homeAdmin_bemVindoAdmin}>Bem Vindo,
          Admin</Text>
        <View data-layer="8c74ee1e-ceda-4f6a-8a1f-6acb6a64f334" style={styles.homeAdmin_rectangle103}></View>
        <Text data-layer="11c26f22-e9b6-489f-b1c9-9c202d30ffb2" style={styles.homeAdmin_indicadores}>Indicadores</Text>
        <View data-layer="0bbdb6bc-2daa-463c-83ef-32f6c34f925c" style={styles.homeAdmin_rectangle105}></View>
        <Text data-layer="79aaadf0-f5ae-45cf-8e66-6e808ea45bcf" style={styles.homeAdmin_tarefas}>Tarefas</Text>
        <View data-layer="3f6561b4-5939-4953-a89b-1ead6529e8e5" style={styles.homeAdmin_rectangle107}></View>
        <Text data-layer="850c4f8c-cba2-4777-9c19-2b2535911628" style={styles.homeAdmin_resultados}>Resultados</Text>
        <View data-layer="76bcb9de-00f3-40a7-9492-d2787529422a" style={styles.homeAdmin_rectangle109}></View>
        <Text data-layer="194ee139-82ba-4c81-9d2b-f73b2b217ec7" style={styles.homeAdmin_dados}>Dados</Text>
        <ReactImage data-layer="7979a648-d751-498b-8967-7690d7826a22" source={require('../assets/images/usabilidade.png')} style={styles.homeAdmin_usabilidade} />
        <ReactImage data-layer="de548f18-a954-43ac-b081-8d7a7ddf2e5c" source={require('../assets/images/avaliacao.png')} style={styles.homeAdmin_avaliacao} />
        <ReactImage data-layer="b6a9abeb-32cd-4977-a818-9e661266e2f4" source={require('../assets/images/aumentando.png')} style={styles.homeAdmin_aumentando} />
        <ReactImage data-layer="d9e6d46a-e849-44fd-8044-cfdfd9661dac" source={require('../assets/images/graficoDeBarras.png')} style={styles.homeAdmin_graficoDeBarras} />
        <View data-layer="8c4a9bab-ffbd-40af-9858-ee4967284967" style={styles.homeAdmin_rectangle183}></View>
        <Text data-layer="6d71f4d7-b30d-4484-8567-6db5f5e357fd" style={styles.homeAdmin_organogramac955e1a5}>Organograma</Text>
        <ReactImage data-layer="91b133e8-ca8b-4c10-b718-6605adfc5d32" source={require('../assets/images/organograma.png')} style={styles.homeAdmin_organograma} />
      </ScrollView>
    );
  }
}

HomeAdmin.propTypes = {

}

HomeAdmin.defaultProps = {

}


const styles = StyleSheet.create({
  "homeAdmin": {
    "opacity": 1,
    "position": "relative",
    "backgroundColor": "rgba(255, 255, 255, 1)",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 375,
    "height": 812,
    "left": 0,
    "top": 0
  },
  "homeAdmin_bemVindoAdmin": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(203, 141, 0, 1)",
    "fontSize": 24,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Segoe UI",
    "textAlign": "left",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 137,
    "height": 64,
    "left": 31,
    "top": 73
  },
  "homeAdmin_rectangle103": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(203, 141, 0, 1)",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "borderTopWidth": 1,
    "borderTopColor": "rgba(203, 141, 0, 1)",
    "borderRightWidth": 1,
    "borderRightColor": "rgba(203, 141, 0, 1)",
    "borderBottomWidth": 1,
    "borderBottomColor": "rgba(203, 141, 0, 1)",
    "borderLeftWidth": 1,
    "borderLeftColor": "rgba(203, 141, 0, 1)",
    "borderTopLeftRadius": 10,
    "borderTopRightRadius": 10,
    "borderBottomLeftRadius": 10,
    "borderBottomRightRadius": 10,
    "shadowColor": "rgb(0,  0,  0)",
    "shadowOpacity": 0.1607843137254902,
    "shadowOffset": {
      "width": 6,
      "height": 7
    },
    "shadowRadius": 8,
    "width": 138,
    "height": 79,
    "left": 31,
    "top": 182
  },
  "homeAdmin_indicadores": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(255, 255, 255, 1)",
    "fontSize": 18,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Segoe UI",
    "textAlign": "left",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 98,
    "height": 24,
    "left": 42,
    "top": 222
  },
  "homeAdmin_rectangle105": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(203, 141, 0, 1)",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "borderTopWidth": 1,
    "borderTopColor": "rgba(203, 141, 0, 1)",
    "borderRightWidth": 1,
    "borderRightColor": "rgba(203, 141, 0, 1)",
    "borderBottomWidth": 1,
    "borderBottomColor": "rgba(203, 141, 0, 1)",
    "borderLeftWidth": 1,
    "borderLeftColor": "rgba(203, 141, 0, 1)",
    "borderTopLeftRadius": 10,
    "borderTopRightRadius": 10,
    "borderBottomLeftRadius": 10,
    "borderBottomRightRadius": 10,
    "shadowColor": "rgb(0,  0,  0)",
    "shadowOpacity": 0.1607843137254902,
    "shadowOffset": {
      "width": 6,
      "height": 7
    },
    "shadowRadius": 8,
    "width": 138,
    "height": 79,
    "left": 186,
    "top": 183
  },
  "homeAdmin_tarefas": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(255, 255, 255, 1)",
    "fontSize": 18,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Segoe UI",
    "textAlign": "left",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 60,
    "height": 24,
    "left": 195,
    "top": 228
  },
  "homeAdmin_rectangle107": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(203, 141, 0, 1)",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "borderTopWidth": 1,
    "borderTopColor": "rgba(203, 141, 0, 1)",
    "borderRightWidth": 1,
    "borderRightColor": "rgba(203, 141, 0, 1)",
    "borderBottomWidth": 1,
    "borderBottomColor": "rgba(203, 141, 0, 1)",
    "borderLeftWidth": 1,
    "borderLeftColor": "rgba(203, 141, 0, 1)",
    "borderTopLeftRadius": 10,
    "borderTopRightRadius": 10,
    "borderBottomLeftRadius": 10,
    "borderBottomRightRadius": 10,
    "shadowColor": "rgb(0,  0,  0)",
    "shadowOpacity": 0.1607843137254902,
    "shadowOffset": {
      "width": 6,
      "height": 7
    },
    "shadowRadius": 8,
    "width": 138,
    "height": 79,
    "left": 31,
    "top": 284
  },
  "homeAdmin_resultados": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(255, 255, 255, 1)",
    "fontSize": 18,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Segoe UI",
    "textAlign": "left",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 92,
    "height": 24,
    "left": 38,
    "top": 332
  },
  "homeAdmin_rectangle109": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(203, 141, 0, 1)",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "borderTopWidth": 1,
    "borderTopColor": "rgba(203, 141, 0, 1)",
    "borderRightWidth": 1,
    "borderRightColor": "rgba(203, 141, 0, 1)",
    "borderBottomWidth": 1,
    "borderBottomColor": "rgba(203, 141, 0, 1)",
    "borderLeftWidth": 1,
    "borderLeftColor": "rgba(203, 141, 0, 1)",
    "borderTopLeftRadius": 10,
    "borderTopRightRadius": 10,
    "borderBottomLeftRadius": 10,
    "borderBottomRightRadius": 10,
    "shadowColor": "rgb(0,  0,  0)",
    "shadowOpacity": 0.1607843137254902,
    "shadowOffset": {
      "width": 6,
      "height": 7
    },
    "shadowRadius": 8,
    "width": 138,
    "height": 79,
    "left": 186,
    "top": 284
  },
  "homeAdmin_dados": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(255, 255, 255, 1)",
    "fontSize": 18,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Segoe UI",
    "textAlign": "left",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 53,
    "height": 24,
    "left": 197,
    "top": 332
  },
  "homeAdmin_usabilidade": {
    "opacity": 1,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "borderTopLeftRadius": 0,
    "borderTopRightRadius": 0,
    "borderBottomLeftRadius": 0,
    "borderBottomRightRadius": 0,
    "width": 30,
    "height": 30,
    "left": 39,
    "top": 188
  },
  "homeAdmin_avaliacao": {
    "opacity": 1,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "borderTopLeftRadius": 0,
    "borderTopRightRadius": 0,
    "borderBottomLeftRadius": 0,
    "borderBottomRightRadius": 0,
    "width": 30,
    "height": 30,
    "left": 197,
    "top": 190
  },
  "homeAdmin_aumentando": {
    "opacity": 1,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "borderTopLeftRadius": 0,
    "borderTopRightRadius": 0,
    "borderBottomLeftRadius": 0,
    "borderBottomRightRadius": 0,
    "width": 30,
    "height": 30,
    "left": 39,
    "top": 289
  },
  "homeAdmin_graficoDeBarras": {
    "opacity": 1,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "borderTopLeftRadius": 0,
    "borderTopRightRadius": 0,
    "borderBottomLeftRadius": 0,
    "borderBottomRightRadius": 0,
    "width": 30,
    "height": 30,
    "left": 197,
    "top": 289
  },
  "homeAdmin_rectangle183": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(203, 141, 0, 1)",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "borderTopLeftRadius": 10,
    "borderTopRightRadius": 10,
    "borderBottomLeftRadius": 10,
    "borderBottomRightRadius": 10,
    "shadowColor": "rgb(0,  0,  0)",
    "shadowOpacity": 0.1607843137254902,
    "shadowOffset": {
      "width": 6,
      "height": 7
    },
    "shadowRadius": 8,
    "width": 138,
    "height": 79,
    "left": 31,
    "top": 388
  },
  "homeAdmin_organogramac955e1a5": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(255, 255, 255, 1)",
    "fontSize": 18,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Segoe UI",
    "textAlign": "left",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 118,
    "height": 24,
    "left": 38,
    "top": 437
  },
  "homeAdmin_organograma": {
    "opacity": 1,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "borderTopLeftRadius": 0,
    "borderTopRightRadius": 0,
    "borderBottomLeftRadius": 0,
    "borderBottomRightRadius": 0,
    "width": 30,
    "height": 30,
    "left": 35,
    "top": 394
  }
});